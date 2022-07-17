import ResponseDiv from '@components/Page/responseDiv/ResponseDiv';
import AddResponseHeader from '@components/Page/addResponse/AddResponseHeader';
import {ResponseController} from '@/dataAccessLayer/actions/response'
import { PromptController } from '@/dataAccessLayer/actions/prompt';
import { useRouter } from 'next/router';
import { CMResponse } from '@interfaces/Response';
import styles from '@components/Page/addResponse/AddResponseHeader.module.sass'
import { Key } from 'react';
import Page from '@templates/Page';
import { Router } from '@mui/icons-material';

//interface with the types that will be held
interface Props {
    thisprompt: string,
    responses: CMResponse[];
};

//Reference: Yudhvir's lectures and notes
export default function responsePage(props: Props) {
    return (
            <Page>
                {/* displaying the prompt retrieved from the database */}
                <AddResponseHeader prompt={props.thisprompt} />
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
export async function getServerSideProps({query}){
    //using this to get the promptID from the URL
    const pID = query.promptID
    try {
        //gets database prompt with this specific ID
        const thisPrompt = await PromptController.findPromptByID(pID as string);
        //formats our prompt object so we can access the attributes
        const myPromptObject = JSON.parse(JSON.stringify(thisPrompt));
        //grabbing the prompt attribute from the object
        const thisprompt = myPromptObject.prompt;
        //getting the responses associated with this ID from the approved responses DB
        const DBresponses = await ResponseController.getApprovedResponsesByID(pID as string);
        let responses;
        if (DBresponses) {
            responses = JSON.parse(JSON.stringify(DBresponses));
        }
        //parsing the responses so we can use them
        
        //returning the info to props to be used on the page
        return {
                props: {
                    thisprompt,
                    responses
                }
            };
    } catch(err) {
        //if there are any issues (such as wrong prompt, it will redirect us here)
        console.log(err)
        return {
            redirect: {
                destination: '/',
                permanent: false,
              },
            }
    }
};
