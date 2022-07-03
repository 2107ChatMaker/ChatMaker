import Background from '@components/Background/Background';
import NavBar from '@components/NavBar/NavBar';
import NextHead from '@components/NextHead';
import ContentWrapper from '@components/ContentWrapper/ContentWrapper';
import Page from '@templates/Page';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import styles from '../styles/rate.module.sass';
import Image from 'next/image'
import { ResponseController } from '@/dataAccessLayer/actions/response';
import { CMResponse } from '@interfaces/Response';
import { PromptController } from '@/dataAccessLayer/actions/prompt';
import { Prompt } from '@interfaces/Prompt';
import { axiosInstance } from '@constants/Axios/axios';

// an interface for the contents of props
interface Props {
    response: CMResponse;
    prompt: Prompt;
}

export default function Rating(props: Props) {
    const {data: session, status: loading} = useSession();
    const [responseValues, setResponseValues] = useState(props.response);
    const [rating, setRating] = useState(true);

    const iconSize: number = 20;

    // Reference: https://stackoverflow.com/questions/29391073/update-by-id-not-working-in-mongoose
    // generates a new secret santa list and saves it to the relevant collection in the database
    async function getNewCard() {
        
        // make an API fetch request to generate a new ss list, save it to the db, and return the new list of names
        const response = await fetch(
            'http://localhost:3000/api/rate',
            {  
                method: 'GET'
            }
        );
        const rateResponse = await response.json(); // catches the response
        const newResponse = JSON.parse(JSON.stringify(rateResponse)) as CMResponse; // parses return to a list of strings
        setResponseValues(newResponse); // sets the hook to the new list of names
    }

    async function rateResponse() {
        // create an object with the values needed to regenerate the secret santa list
    let rateValues = {
        _id: responseValues._id, 
        rating: String(rating)
    };

    const body = JSON.stringify(rateValues) // stringify the object
        // make an API fetch request to generate a new ss list, save it to the db, and return the new list of names
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

    async function rate(rating: boolean) {
        setRating(rating);
        await rateResponse();
        await getNewCard();
    };

    return (
        <Page
            headTitle = "Add Prompt"
            headName = "Add Prompt"
            headContent = "Add a new prompt"
        >
            <div className={styles.RateResponseBody}>
                <div className={styles.RateResponseTitleContainer}>
                    <h1>Rate The Response</h1>
                </div>
                <div className={styles.RateResponseOuterContainer}>
                    <div className={styles.RateResponseInnerContainer}>
                        <h2>{props.prompt.prompt}</h2>
                        <div className={styles.RateResponseDeliniator}></div>
                        <h3 className={styles.RateResponseResponse}>{`"${responseValues.response}"`}</h3>
                        <div className={styles.RateResponseTagsContainer}>
                            <h3 className={styles.RateResponseTagsTitle}>Tags:</h3>
                            <div className={styles.RateResponseTagList}>
                                {
                                responseValues.tags.map((tag: string) => {
                                    return (
                                        <div key={tag}>
                                            <div className={styles.RateResponseTagContainer}>
                                                <h3 >{tag}</h3>
                                            </div>
                                        </div>
                                    );
                                })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.RateResponseButtonContainer}>
                    <button className={styles.RateResponseButton} onClick={() => rate(false)}> <Image src="/resources/rateResponse/cross.png" alt="me" width={iconSize} height={iconSize} /> </button>
                    <button className={styles.RateResponseButton} onClick={() => getNewCard()}> <Image src="/resources/rateResponse/skip.png" alt="me" width={iconSize} height={iconSize} /> </button>
                    <button className={styles.RateResponseButton} onClick={() => rate(true)}> <Image src="/resources/rateResponse/check.png" alt="me" width={iconSize} height={iconSize} /> </button>
                </div>
            </div>            
        </Page>
    );
}

export async function getServerSideProps() {
    // get all lists associated with jimjam
    const queryResult = await ResponseController.getRandomResponse();
    // parse the results into an array of SSList
    const response = JSON.parse(JSON.stringify(queryResult)) as CMResponse;
    const promptqueryResult = await PromptController.getPrompt(response.promptID);
    const prompt = JSON.parse(JSON.stringify(promptqueryResult)) as Prompt;

    return {
        props: {
          response,
          prompt
        }
    };
}

