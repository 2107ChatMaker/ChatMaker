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

// an interface for the contents of props
interface Props {
    response: CMResponse;
    prompt: Prompt;
}

export default function Rating(props: Props) {
    const {data: session, status: loading} = useSession();
    const [response, setResponse] = useState(props.response);
    const [tags, setTags] = useState(props.response.tags);

    const iconSize: number = 20;

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
                        <h3 className={styles.RateResponseResponse}>{`"${response.response}"`}</h3>
                        <div className={styles.RateResponseTagsContainer}>
                            <h3 className={styles.RateResponseTagsTitle}>Tags:</h3>
                            <div className={styles.RateResponseTagList}>
                                {
                                tags.map((tag: string) => {
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
                    <button className={styles.RateResponseButton} onClick={()=>{}}> <Image src="/resources/rateResponse/cross.png" alt="me" width={iconSize} height={iconSize} /> </button>
                    <button className={styles.RateResponseButton} onClick={()=>{}}> <Image src="/resources/rateResponse/skip.png" alt="me" width={iconSize} height={iconSize} /> </button>
                    <button className={styles.RateResponseButton} onClick={()=>{}}> <Image src="/resources/rateResponse/check.png" alt="me" width={iconSize} height={iconSize} /> </button>
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

