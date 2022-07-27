
import ResponseDiv from "@components/ResponsePageComponents/responseDiv";
import { CMResponse } from "@interfaces/Response";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
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
    //setting variables to hold each item
    const [responses, setResponses] = useState(data.retrievedResponses);
    const [retrivedIDs, setRetrievedIDs] = useState(data.retrievedIDs);
    const [hasMore, setHasMore] = useState(true);

    // reference: https://stackoverflow.com/questions/42898009/multiple-fields-with-same-key-in-query-params-axios-request
    const getNewResponses = async () => {
        //getting a list of the IDs of the responses already rendered
        const newResponse = JSON.parse(JSON.stringify(retrivedIDs))
        // this variable allows us to pass in multiple variables to our axios get request
        var params = new URLSearchParams();
        params.append('promptID', data.PID)
        params.append('retrivedIDs', newResponse)
        //making an axios get request to our response API, passing in promptID(PID) and the retrieved ID list
        const res = await axios.get(`/api/response`, {
            params: params}
        );
        //getting the responses and the retrieved IDs back from the database, and then adding them to the lists
        setResponses((responses) => [...responses, ...res.data.retrievedResponses])
        setRetrievedIDs((retrivedIDs) => [...retrivedIDs, ...res.data.newRetrievedIDs])
    }

    
    return (
        <>
            <InfiniteScroll
            dataLength={responses.length}
            next={getNewResponses}
            hasMore={hasMore}
            loader={<div><CircularProgress/></div>}
            endMessage={<h4>Nothing more to show</h4>}
            >
                {
                    responses.map((response) => {
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


