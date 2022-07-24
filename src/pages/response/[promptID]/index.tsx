//react imports
import { getSession, useSession } from 'next-auth/react';
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


//interface with the types that will be held
interface Props {
    thisprompt: string,
    responses: CMResponse[];
    thisPromptID: string,
};

//Reference: Yudhvir's lectures and notes
export default function ResponsePage(props: Props) {
    const {data: session, status: loading} = useSession();
    // The logged in users ID
    const [userID, setUserID] = useState('');
    // assign session userID to state
    useEffect(()=> {
        if (session) {
            setUserID(session.user.id);
        }
    }, [session]);
    
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
                                <div key={CMResponse._id as Key}>
                                    <ResponseDiv 
                                        responseID={CMResponse._id} 
                                        thisPromptID={props.thisPromptID} 
                                        userID={userID} 
                                        prompt={CMResponse.response as string}
                                        tags={CMResponse.tags}
                                    />
                                </div>
                            )
                        }
                    )
                }
                </div>
            </Page>
    );
};

//getting the 'props' we want to use from the server
export async function getServerSideProps({req, query, res}) {
    //caching
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
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
        return {
            redirect: {
                destination: '/',
                permanent: false,
              },
            };
    };
};
