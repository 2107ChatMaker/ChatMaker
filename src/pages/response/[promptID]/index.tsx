import ResponseDiv from '@components/Page/responseDiv/ResponseDiv';
import AddResponseHeader from '@components/Page/addResponse/AddResponseHeader';
import {ResponseController} from '@/dataAccessLayer/actions/response'
import { PromptController } from '@/dataAccessLayer/actions/prompt';
import { CMResponse } from '@interfaces/Response';
import styles from '@components/Page/addResponse/AddResponseHeader.module.sass'
import { Key, useEffect, useState } from 'react';
import Page from '@templates/Page';
import { getSession, useSession } from 'next-auth/react';
import { UserController } from '@/dataAccessLayer/actions/user';

//interface with the types that will be held
interface Props {
    thisprompt: string,
    responses: CMResponse[];
    thisPromptID: string,
};

//Reference: Yudhvir's lectures and notes
export default function responsePage(props: Props) {
    const {data: session, status: loading} = useSession();
    // assign session userID to state
    useEffect(()=> {
        if (session) {
            setUserID(session.user.id);
        }
    }, [session]);

    // The logged in users ID
    const [userID, setUserID] = useState('');
    return (
            <Page>
                {/* displaying the prompt retrieved from the database */}
                <AddResponseHeader prompt={props.thisprompt} userID={userID} promptID={props.thisPromptID} />
                {/* mapping the responses to the divs */}
                <div className={styles.responseContainer}>
                {
                    props.responses.map(
                        (CMResponse) => {
                            return(
                                <div key={ CMResponse._id as Key}>
                                    <ResponseDiv prompt={CMResponse.response as string}>
                                    {CMResponse.tags}    
                                    </ResponseDiv>
                                </div>
                            );
                        }
                    )
                };
                </div>
            </Page>
    );
};

//getting the 'props' we want to use from the server
export async function getServerSideProps({req, query}){
    //using this to get the promptID from the URL
    const pID = query.promptID;
    const thisPromptID = pID;
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
        //getting the responses associated with this ID from the approved responses DB
        const DBresponses = await ResponseController.getApprovedResponsesByID(pID as string);
        //declaring variable here so we can use it below if we have any responses matching the prompt ID
        let responses;
        //checking to see if we have any responses in the database before we try to manipulate the data
        if (DBresponses) {
            //there was at least one response, so we can parse and stringiify the data to be used
            responses = JSON.parse(JSON.stringify(DBresponses));
        }
        //returning the info to props to be used on the page
        return {
                props: {
                    thisprompt,
                    responses,
                    thisPromptID,
                }
            };
    } catch(err) {
        //if there are any issues (such as wrong promptID, it will redirect us here)
        console.log(err)
        return {
            redirect: {
                destination: '/',
                permanent: false,
              },
            }
    }
};
