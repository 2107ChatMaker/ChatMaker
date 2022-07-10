// react imports
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import styles from '../styles/rate.module.sass';
import Image from 'next/image';
// components
import Page from '@templates/Page';
import RateCard from '@components/RateCard/RateCard';
// backend
import { ResponseController } from '@/dataAccessLayer/actions/response';
import { PromptController } from '@/dataAccessLayer/actions/prompt';
// interfaces
import { Prompt } from '@interfaces/Prompt';
import { RatingCard } from '@interfaces/RatingCard';
import { CMResponse } from '@interfaces/Response';

// On this page the user is given a response and is asked to rate it
export default function Rating(props: RatingCard) {
    const {data: session, status: loading} = useSession();
    useEffect(()=> {
        if (session) {
            setUserID(session.user.id);
        }
    }, [session]);
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
    // generates a new secret santa list and saves it to the relevant collection in the database
    async function getNewCard(execute:boolean = false) {

        // guards against multiple button presses
        if (execute || (!execute && !buttonClicked)) {
            // stop user from executing this function again until buttonClicked is set to false
            setButtonClicked(true);

            // make an API fetch request to generate a RateCard
            const response = await fetch(
                'http://localhost:3000/api/rate',
                {  
                    method: 'GET'
                }
            );
            const rateResponse = await response.json(); // catches the response
            const newCard = JSON.parse(JSON.stringify(rateResponse)) as RatingCard; // parses into a rating Card

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
            _id: featuredCard.responseId, 
            rating: String(rating)
        };
        // stringify the values
        const body = JSON.stringify(rateValues);

        // make the request to update the responses rating
        const response = await fetch(
            'http://localhost:3000/api/rate',
            {  
                method: 'PUT',
                body: body,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            }
        );
    };

    // rate the current response and animate it
    async function rate(rating: boolean) {
        // guard against multiple button presses
        if (buttonClicked) {return;}
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
            headTitle = "Rate A Response"
            headName = "Rate A Response"
            headContent = "use this page to rate a response"
        >
            <div className={styles.RateResponseBody}>
                <div className={styles.RateResponseTitleContainer}>
                    <h1>Rate The Response</h1>
                </div>
                <div className={styles.RateResponseCardOuterContainer}>
                    <div className={styles.RateResponseCardInnerContainer}>
                        <div className={`${styles.RateResponseFeaturedCardContainer} ${cardTransition? styles.RateResponseAnimateCardSlide : ""}` }>
                            <RateCard response={featuredCard.response} prompt={featuredCard.prompt} tags={featuredCard.tags}/>
                        </div>
                        <div className={styles.RateResponseHiddenCardContainer}>
                            <RateCard response={AlternateCard.response} prompt={AlternateCard.prompt} tags={AlternateCard.tags}/>
                        </div>
                    </div>
                </div>
                <div className={styles.RateResponseButtonContainer}>
                    <button className={styles.RateResponseButton} onClick={() => rate(false)}><div className={styles.RateResponseButtonImageContainerA}><Image src="/resources/rateResponse/cross.png" alt="me" width={"100%"} height={"100%"} /></div></button>
                    <button className={styles.RateResponseButton} onClick={() => getNewCard()}><div className={styles.RateResponseButtonImageContainerB}><Image className='RateResponseSkipIcon' src="/resources/rateResponse/skip.png" alt="me" width={"100%"} height={"100%"} /></div></button>
                    <button className={styles.RateResponseButton} onClick={() => rate(true)}><div className={styles.RateResponseButtonImageContainerC}><Image src="/resources/rateResponse/check.png" alt="me" width={"100%"} height={"100%"} /></div></button>
                </div>
            </div>            
        </Page>
    );
}

export async function getServerSideProps() {
    // get a random response from the backend and parse it
    const queryResult = await ResponseController.getRandomResponse();
    const newResponse = JSON.parse(JSON.stringify(queryResult)) as CMResponse;
    // get the corrisponding prompt from the backend and parse it
    const promptqueryResult = await PromptController.getPrompt(newResponse.promptID);
    const newPrompt = JSON.parse(JSON.stringify(promptqueryResult)) as Prompt;

    // build the values that will return as a RatingCard
    const responseId = newResponse._id;
    const tags = newResponse.tags;
    const response = newResponse.response;
    const prompt = newPrompt.prompt;

    return {
        props: {
            responseId,
            prompt,
            response,
            tags
        }
    };
}