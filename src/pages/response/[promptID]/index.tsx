//react imports
import { getSession } from 'next-auth/react';
import { Key, useEffect, useState } from 'react';
import { _id } from '@next-auth/mongodb-adapter';
//component imports
import ResponseDiv from '@components/ResponsePageComponents/responseDiv';
import AddResponseHeader from '@components/ResponsePageComponents/addResponse/AddResponseHeader';
import styles from '@components/ResponsePageComponents/addResponse/AddResponseHeader.module.sass';
import Page from '@templates/Page';
//controllers
import { ResponseController } from '@/dataAccessLayer/actions/response';
import { PromptController } from '@/dataAccessLayer/actions/prompt';
import { CMResponse } from '@interfaces/Response';
//next
import { useRouter } from 'next/router';

import dynamic from "next/dynamic";

import CircularProgress from '@mui/material/CircularProgress';

import WhiteDiv from '@components/ResponsePageComponents/whiteDiv'
import { Prompt } from '@interfaces/Prompt';
import { ApprovedResponseController } from '@/dataAccessLayer/actions/approvedRating';

//import Content from './Content'

//interface with the types that will be held
interface ResponseProps {
    returnPrompt: string,
    PID: string,
    userID: string;
    retrievedIDs: string[],
    retrievedResponses: CMResponse[]
};

//Reference: Yudhvir's lectures and notes
export default function ResponsePage(props: ResponseProps) {
    const router = useRouter();
    // assign session userID to state
    useEffect(()=> {
        if (!props.userID) {
            router.push('/');
        }
    }, [props.userID, router]);

    const Content = dynamic(() => import("./Content"), {
        loading: () => <div><CircularProgress /></div>
    })

 
    return (
        <Page>
            {/* displaying the prompt retrieved from the database */}
            <AddResponseHeader prompt={props.returnPrompt} userID={props.userID} promptID={props.PID} />
            {/* mapping the responses to the divs */}
            <div id='scrollContainer' className={styles.responseContainer}>
                <Content returnPrompt={props.returnPrompt} PID = {props.PID} userID = {props.userID} retrievedIDs = {props.retrievedIDs} retrievedResponses = {props.retrievedResponses}/>
            </div>
        </Page>
    );
    
    
};

//getting the 'props' we want to use from the server
export async function getServerSideProps({req, query, res}) {
    //using this to get the promptID from the URL
    const PID = String(query.promptID);
    // console.log('promptID: ', PID)
    
    //try catch block so we only do the things we want to do
    try {
        //now we need to get the session to get the userID for the page
        const session = await getSession({ req });

        //returning the info to props to be used on the page
        if (session && session.user) {
            //gets database prompt with this specific ID
            const retrievedPrompt: Prompt = await PromptController.findPromptByID(PID) as Prompt;
            // console.log("retrieved prompt: ", retrievedPrompt)
            //formats our prompt object so we can access the attributes
            //grabbing the prompt attribute from the object
            const returnPrompt = retrievedPrompt.prompt;
            // console.log('returnPrompt: ', returnPrompt)

            let retrievedIDs: string[] = [];
            let retrievedResponses: CMResponse[] = [];

            for (let i = 0; i < 10; i++) {
                // console.log("iteration: ", i)
                // get a random response from the backend and parse it
                const queryResult = await ApprovedResponseController.getRandomResponse(retrievedIDs as [string], PID);
                // console.log("queryResult: ", queryResult)
                if (queryResult == null) {
                    break;
                } 
                const newResponse = JSON.parse(JSON.stringify(queryResult)) as CMResponse;
                // console.log("newResponse: ", newResponse)
                retrievedIDs.push(String(newResponse._id))
                retrievedResponses.push(newResponse)
            }

            res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
            return {
                props: {
                    returnPrompt,
                    PID,
                    userID: session.user.id,
                    retrievedIDs,
                    retrievedResponses
                }
            };
        } else {
            throw {
                message: 'You are not logged in',
            };
        }
    } catch(err) {
        //if there are any issues (such as wrong promptID, it will redirect us here)
        return {
            redirect: {
                destination: '/',
                permanent: false,
              },
            };
    };
};
