// react imports
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
//material UI
import { Check, Close, SkipNext as Skip } from '@mui/icons-material';
// components
import Page from '@components/templates/Page';
import RateCard from '@components/RateCard';
import RateButton from '@components/RateButton';
import PageTitle from '@components/PageTitle';
// data access objects
import { ResponseController } from '@/dataAccessLayer/controllers/response';
import { PromptController } from '@/dataAccessLayer/controllers/prompt';
// interfaces
import { Prompt } from '@interfaces/Prompt';
import { RatingCard } from '@interfaces/RatingCard';
import { CMResponse } from '@interfaces/Response';
import { UserController } from '@/dataAccessLayer/controllers/user';
// utils
import axios from '@utils/constants/axios';
//custom styles
import styles from '../styles/rate.module.sass';

// On this page the user is given a response and is asked to rate it
export default function Rating(props: RatingCard) {
    // session that manages logged-in user
    const {data: session, status: loading} = useSession();
    // assign session userID to state
    useEffect(()=> {
        if (session) {
            setUserID(session.user.id);
        }
    }, [session]);

    // The logged in users ID
    const [userID, setUserID] = useState('');
    // the Top level card that animates off screen when prompted
    const [featuredCard, setFeaturedCard] = useState(props);
    // the bottom level card
    const [AlternateCard, setAlternateCard] = useState(props);
    // the user assigned rating of the current response
    const [rating, setRating] = useState(true);
    // triggers card transition
    const [cardTransition, setCardTransition] = useState(false);
    // guards multiple button presses before animation completes
    const [buttonClicked, setButtonClicked] = useState(false);

    // makes the top card slide right off screen before setting its values to the same as the bottom card and returing it to its original position
    function animateTopCard(newCard: RatingCard) {
        // triggers card animation
        setCardTransition(true);

        // assigns a short delay to manage users trying to press the button before the animation finishes
        setTimeout(function () {
            // after .8 seconds
            // update the now off screen feature cards values to match the onscreen card
            setFeaturedCard(newCard); 
            // returns featured card to its original position covereing the bottom card
            setCardTransition(false);
            // allows the user to press the button again
            setButtonClicked(false);
        }, 800);
        
    }

    // Reference: https://stackoverflow.com/questions/29391073/update-by-id-not-working-in-mongoose
    async function getNewCard(execute:boolean = false) {
        
        // guards against multiple button presses
        if (execute || (!execute && !buttonClicked)) {
            // stop user from executing this function again until buttonClicked is set to false
            setButtonClicked(true);

            // forces card to exit right when skipping
            if (!execute) {setRating(true);}

            // make an API fetch request to generate a RateCard
            const {data: rateResponse}= await axios.get(`api/rate?userID=${userID}`); // catches the response

            // parses into a rating Card
            const newCard = rateResponse as RatingCard; 

            // sets the bottom card with the new card values
            setAlternateCard(newCard); 

            // animates the top card off screen, applies the new cards values, then returns it to above the bottom card
            animateTopCard(newCard);
        }
    }

    // adds or removes 1 from the current responses rating 
    async function rateResponse() {

        // build the values to send to the back end 
        let rateValues = {
            responseID: featuredCard.responseId, 
            rating: String(rating),
            userID: userID
        };

        const {data: response} = await axios.put("/api/rate", rateValues);

    };

    // rate the current response and animate it
    async function rate(rating: boolean) {
        // guard against multiple button presses
        if (buttonClicked || featuredCard.responseId == "" || featuredCard.response == "") {return;}
        setButtonClicked(true);
        // set rating depending on button pressed
        setRating(rating);
        // assign the rating to the current response
        await rateResponse();
        // get a new card and update the current cards with animations
        await getNewCard(true);
    };

    return (
        <Page
            headTitle = " rate"
            headContent="
            welcome to the chat maker rate page, 
            rate response. here you can rate and vote for different response that others have contributed.
            Chat maker is a free, crowdsourced platform for creating, referencing, and sharing 
            prompts and response for ingame dialogues.
            "
        >
            <div className={styles.RateResponseBody}>
                <PageTitle title="Rate A Response" />
                <div className={styles.RateResponseCardOuterContainer}>
                    <div className={styles.RateResponseCardInnerContainer}>
                        <div className={`${styles.RateResponseFeaturedCardContainer} ${cardTransition? ((rating)? styles.RateResponseAnimateCardSlideR : styles.RateResponseAnimateCardSlideL) : ""}` }>
                            <RateCard response={featuredCard.response} prompt={featuredCard.prompt} tags={featuredCard.tags}/>
                        </div>
                        <div className={styles.RateResponseHiddenCardContainer}>
                            <RateCard response={AlternateCard.response} prompt={AlternateCard.prompt} tags={AlternateCard.tags}/>
                        </div>
                    </div>
                </div>
                <div className={styles.RateResponseButtonContainer}>
                    <RateButton onClick={()=>rate(false)}>
                        <Close fontSize='large' sx={{color: "white"}}/>
                    </RateButton>
                    <RateButton onClick={()=>getNewCard()}>
                        <Skip fontSize='large' sx={{color: "white"}}/>
                    </RateButton>
                    <RateButton onClick={()=>rate(true)}>
                        <Check fontSize='large' sx={{color: "white"}}/>
                    </RateButton>
                </div>
            </div>            
        </Page>
    );
}

export async function getServerSideProps({req, res}) {
    // retrieve session
    const session = await getSession({ req });
    if (session) {
        // get uservalues by session id
        const userValues:UserController = await UserController.getUserByID(session.user.id);
        // create new usercontroller to properlly cast userValues
        const user: UserController = new UserController(userValues);
        // get a random response from the backend and parse it
        const queryResult = await ResponseController.getRandomResponse(user.responsesRated);
        const newResponse = JSON.parse(JSON.stringify(queryResult)) as CMResponse;

        // default return values
        let responseId = "";
        let tags = [];
        let response = "";
        let prompt = "";

        if (!!newResponse) {
            // get the corrisponding prompt from the backend and parse it
            const promptqueryResult = await PromptController.getPrompt(newResponse.promptID);
            const newPrompt = JSON.parse(JSON.stringify(promptqueryResult)) as Prompt;

            // build the values that will return as a RatingCard
            responseId = newResponse._id as string;
            tags = newResponse.tags;
            response = newResponse.response;
            prompt = newPrompt.prompt;
        }
        else {
            // return values if all responses have been rated
            response = "You've rated all responses!\nTry creating a response of your own!";
            prompt = "Wow You're Amazing";
        }
        //caching
        res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
        return {
            props: {
                responseId,
                prompt,
                response,
                tags
            }
        };
    } else {
        return {
            redirect: {
                pathname: '/auth/login',
                permanent: false,
            }
        };
    }
}

