//react imports
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { _id } from '@next-auth/mongodb-adapter';
//next
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
//component imports
import AddResponseHeader from '@components/ResponsePageComponents/addResponse/AddResponseHeader';
import Page from '@templates/Page';
//controllers
import { PromptController } from '@/dataAccessLayer/actions/prompt';
import { ApprovedResponseController } from '@/dataAccessLayer/actions/approvedRating';
//material UI
import CircularProgress from '@mui/material/CircularProgress';
//interfaces
import { Prompt } from '@interfaces/Prompt';
import { CMResponse } from '@interfaces/Response';
//custom styles
import styles from '@components/ResponsePageComponents/addResponse/AddResponseHeader.module.sass';


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

    //dynamically loading the responses in case it takes some time to load
    const Content = dynamic(() => import("../../../components/ResponsePageComponents/Content"), {
        //will show a blue loading circle while loading in the content
        loading: () => <div><CircularProgress /></div>
    })
 
    return (
        <Page
        >
            {/* displaying the prompt retrieved from the database */}
            <AddResponseHeader prompt={props.returnPrompt} userID={props.userID} promptID={props.PID} />
            <div id='scrollContainer' className={styles.responseContainer}>
                {/* this renders the approved responses of the prompt */}
                <Content returnPrompt={props.returnPrompt} PID = {props.PID} userID = {props.userID} retrievedIDs = {props.retrievedIDs} retrievedResponses = {props.retrievedResponses}/>
            </div>
        </Page>
    );
};

//getting the 'props' we want to use from the server
export async function getServerSideProps({req, query, res}) {
    //using this to get the promptID from the URL
    const PID = String(query.promptID);
    
    //try catch block so we only do the things we want to do
    try {
        //now we need to get the session to get the userID for the page
        const session = await getSession({ req });

        //returning the info to props to be used on the page
        if (session && session.user) {
            //gets database prompt with this specific ID
            const retrievedPrompt: Prompt = await PromptController.findPromptByID(PID) as Prompt;
            //grabbing the prompt attribute from the object
            const returnPrompt = retrievedPrompt.prompt;
            //declaring an array to hold all the response IDs we've already gotten
            let retrievedIDs: string[] = [];
            //an array to hold all of the responses we will show
            let retrievedResponses: CMResponse[] = [];
            //grabbing 10 random responses
            for (let i = 0; i < 10; i++) {
                // get a random approved response from the backend for this specific prompt
                //we are also passing in a list of the response IDs we have already gotten, so we don't get repeat responses
                const queryResult = await ApprovedResponseController.getRandomResponse(retrievedIDs as [string], PID);
                // if there are no more approved responses, query result will return null and we break the loop
                if (queryResult == null) {
                    break;
                } 
                //parsing the database result
                const newResponse = JSON.parse(JSON.stringify(queryResult)) as CMResponse;
                //pushing this new ID to the list
                retrievedIDs.push(String(newResponse._id))
                //pushing the new response object to our array
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
