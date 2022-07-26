import { ResponseController } from "@/dataAccessLayer/actions/response";
import ResponseDiv from "@components/ResponsePageComponents/responseDiv";
import WhiteDiv from "@components/ResponsePageComponents/whiteDiv";
import { CMResponse } from "@interfaces/Response";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props {
    thisprompt,
    thisPromptID,
    userID,
    retrievedIDs,
    retrievedResponses
}


const Content = (data) => {
    //const theseResponses = data.responses
    const [responses, setResponses] = useState(data.data.retrievedResponses);
    const [retrivedIDs, setRetrievedIDs] = useState(data.data.retrievedIDs);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(10)

    const promptID = data.data.thisPromptID
    console.log('this prompt ID ', data.data.thisPromptID)


    // const getresponses = async () => {
    //     const promptID = data.promptID
    //     //const DBresponses = await ResponseController.getApprovedResponsesByID(promptID as string);
    //     const DBresponses = fetch(`/api/response/`, promptID)
    //     //declaring variable here so we can use it below if we have any responses matching the prompt ID
    //     let responses;
    //     console.log(promptID)
    //     //checking to see if we have any responses in the database before we try to manipulate the data
    //     if (DBresponses) {
    //         //there was at least one response, so we can parse and stringiify the data to be used
    //         responses = JSON.parse(JSON.stringify(DBresponses));
    //     }
    //     setResponses(responses)
    // }
    

    // const getMoreResponses = async () => {
    //     console.log('usingGetMoreResponses')
    //     const res = await axios.get(
    //         `/api/response/?promptID=${promptID}`
    //     );
        
    //     //console.log(res)
    //     const newResponses = JSON.parse(JSON.stringify(res));
    //     setResponses(([prevResponse]) => [...prevResponse, ...newResponses]);
    //     setSkip(skip + 10)
    // };
    const getNewResponses = async () => {
        // console.log("getnewresponses")
        let data = {
            promptID: promptID, 
            retrivedIDs: retrivedIDs
        }
        const newResponse = JSON.parse(JSON.stringify(retrivedIDs))
        console.log('content prompt ID', promptID)
        const res = await axios.get(`/api/response?promptID=${promptID}&retrievedIDs=${newResponse}`);
        console.log('res ', res)
        // const newResponses = JSON.parse(JSON.stringify(res));
        // setResponses((prevResponse) => [...prevResponse, ...newResponses]);
        // setSkip(skip + 10)
    }
    useEffect(() => {
        // console.log('test', responses)
        getNewResponses()
        
    }, [])
    
    // if (!responses) {
    //     return (
    //         <WhiteDiv>No responses yet! Try adding your own</WhiteDiv>
    //     )
    // }

    return (
        <>
            <InfiniteScroll
            dataLength={10}
            next={getNewResponses}
            scrollableTarget='scrollContainer'
            inverse = {true}
            hasMore={hasMore}
            loader={<div style={{textAlign: "center", marginTop: "20px"}}><CircularProgress /></div>}
            endMessage={<h4>Nothing more to show</h4>}

            >
            
                {
                    responses.map((response) => {
                        // console.log('response ', response)
                        return(
                            <div key={String(response._id)}>

                                <ResponseDiv 
                                response={response.response} 
                                userID={response.userID} 
                                thisPromptID={response.promptID} 
                                responseID={response.responseID} 
                                tags={response.tags}                                
                                />
                            </div>
                        )
                    })
                }

            </InfiniteScroll>
        </>

    );
};
    




export default Content;



// export const getStaticProps = async (context, {query}) => {
//     const promptID = query.promptID
//     //const DBresponses = await ResponseController.getApprovedResponsesByID(promptID as string);
//     const DBresponses = fetch(
//         "localhost:3000/api/response", promptID
//     )
//     //declaring variable here so we can use it below if we have any responses matching the prompt ID
//     let responses;
//     console.log(promptID)
//     //checking to see if we have any responses in the database before we try to manipulate the data
//     if (DBresponses) {
//         //there was at least one response, so we can parse and stringiify the data to be used
//         responses = JSON.parse(JSON.stringify(DBresponses));
//     }
//     return {
//         data: {
//             responses
//         }
//     };
//   }

