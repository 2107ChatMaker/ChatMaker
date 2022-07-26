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

//import Content from './Content'

//interface with the types that will be held
interface Props {
    thisprompt: string,
    responses: CMResponse[];
    thisPromptID: string,
    userID: string;
    retrievedIDs: string[],
    retrievedResponses: CMResponse[]
};

//Reference: Yudhvir's lectures and notes
export default function ResponsePage(props: Props) {
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
            <AddResponseHeader prompt={props.thisprompt} userID={props.userID} promptID={props.thisPromptID} />
            {/* mapping the responses to the divs */}
            <div id='scrollContainer' className={styles.responseContainer}>
                <Content data={props} />
            </div>
        </Page>
    );
    
    
};

//getting the 'props' we want to use from the server
export async function getServerSideProps({req, query, res}) {
    //using this to get the promptID from the URL
    const pID = query.promptID;
    console.log('pID ', pID)
    const thisPromptID = String(pID);
    console.log('thispromptid ', thisPromptID)
    let skip = 0
    //now we need to get the session to get the userID for the page
    const session = await getSession({ req });
    //try catch block so we only do the things we want to do
    try {
        //gets database prompt with this specific ID
        const thisPrompt = await PromptController.findPromptByID(pID as string);
        //formats our prompt object so we can access the attributes
        const myPromptObject = JSON.parse(JSON.stringify(thisPrompt));
        //grabbing the prompt attribute from the object
        const thisprompt = myPromptObject.prompt;
        // //getting the responses associated with this ID from the approved responses DB
        // const DBresponses = await ResponseController.getApprovedResponsesByID(pID as string);
        // //declaring variable here so we can use it below if we have any responses matching the prompt ID
        // let responses;
        // //checking to see if we have any responses in the database before we try to manipulate the data
        // if (DBresponses) {
        //     //there was at least one response, so we can parse and stringiify the data to be used
        //     responses = JSON.parse(JSON.stringify(DBresponses));
        // }
        
        //returning the info to props to be used on the page
        if (session && session.user) {
            console.log('server side props')

            let retrievedIDs: string[] = [];
            let retrievedResponses: CMResponse[] = []

            for (let i = 0; i <= 10; i++) {
                // get a random response from the backend and parse it
                const queryResult = await ResponseController.getRandomResponse(retrievedIDs as [string]);
                const newResponse = JSON.parse(JSON.stringify(queryResult)) as CMResponse;
                retrievedIDs.push(String(newResponse._id))
                retrievedResponses.push(newResponse)
            }
            // console.log('test1', retrievedIDs)
            // console.log('test2', retrievedResponses)
            //caching
            res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
            return {
                props: {
                    thisprompt,
                    //responses,
                    thisPromptID,
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
