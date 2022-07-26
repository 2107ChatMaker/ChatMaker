import { ResponseController } from "@/dataAccessLayer/actions/response";
import ResponseDiv from "@components/ResponsePageComponents/responseDiv";
import WhiteDiv from "@components/ResponsePageComponents/whiteDiv";
import { CMResponse } from "@interfaces/Response";
import { PostAddSharp } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

//interface with the types that will be held
interface ResponseProps {
    returnPrompt: string,
    PID: string,
    userID: string;
    retrievedIDs: string[],
    retrievedResponses: CMResponse[]
};

const Content = (data: ResponseProps) => {
    //const theseResponses = data.responses
    const [responses, setResponses] = useState(data.retrievedResponses);
    const [retrivedIDs, setRetrievedIDs] = useState(data.retrievedIDs);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(10)

    const promptID = data.PID
    // console.log('this prompt ID ', data.returnPrompt)

    // reference: https://stackoverflow.com/questions/42898009/multiple-fields-with-same-key-in-query-params-axios-request
    const getNewResponses = async () => {
        // console.log("getnewresponses")

        // console.log("data promptID: ", data.PID)
        const newResponse = JSON.parse(JSON.stringify(retrivedIDs))
        // console.log('content prompt ID', promptID)
        var params = new URLSearchParams();
        params.append('promptID', data.PID)
        params.append('retrivedIDs', newResponse)
        const res = await axios.get(`/api/response`, {
            params: params});
        // console.log('res ', res.data)
        console.log("responses before: ", responses)
        setResponses((responses) => [...responses, ...res.data.retrievedResponses])
        setRetrievedIDs((retrivedIDs) => [...retrivedIDs, ...res.data.newRetrievedIDs])
        console.log("\n\n\nresponses after: ", responses)
    }
    // useEffect(() => {
    //     // console.log('test', responses)
    //     // getNewResponses()
        
    // }, [])


    return (
        <>
            <InfiniteScroll
            dataLength={responses.length}
            next={getNewResponses}
            hasMore={hasMore}
            loader={<div>loading...</div>}
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
                                responseID={response._id} 
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


