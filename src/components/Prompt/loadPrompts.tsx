
import ResponseDiv from "@components/ResponsePageComponents/responseDiv";
import { CMResponse } from "@interfaces/Response";
import { Prompt as promptInterface} from "@interfaces/Prompt";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import router from "next/router";
import Prompt from "./index";
import styles from '@styles/ExplorePrompts.module.sass';


//interface with the types that will be held
interface PromptProps {
    returnPrompt: string,
    PID: string,
    retrievedIDs: string[],
    retrievedPrompts: promptInterface[]
};

const loadPrompts = (data: PromptProps) => {
    //setting variables to hold each item
    const [prompts, setPrompts] = useState(data.retrievedPrompts);
    const [retrivedIDs, setRetrievedIDs] = useState(data.retrievedIDs);
    const [hasMore, setHasMore] = useState(true);

    // reference: https://stackoverflow.com/questions/42898009/multiple-fields-with-same-key-in-query-params-axios-request
    const getNewPrompts = async () => {
        //getting a list of the IDs of the responses already rendered
        const newPrompt = JSON.parse(JSON.stringify(retrivedIDs))
        // this variable allows us to pass in multiple variables to our axios get request
        var params = new URLSearchParams();
        params.append('promptID', data.PID)
        params.append('retrivedIDs', newPrompt)
        //making an axios get request to our response API, passing in promptID(PID) and the retrieved ID list
        const res = await axios.get(`/api/prompt`, {
            params: params}
        );
        //getting the responses and the retrieved IDs back from the database, and then adding them to the lists
        setPrompts((prompts) => [...prompts, ...res.data.retrievedPrompts])
        setRetrievedIDs((retrivedIDs) => [...retrivedIDs, ...res.data.newRetrievedIDs])
    }

    
    return (
        <>
            <InfiniteScroll
            dataLength={prompts.length}
            next={getNewPrompts}
            hasMore={hasMore}
            loader={<div><CircularProgress/></div>}
            endMessage={<h4>Nothing more to show</h4>}
            >
                {   
                    prompts.map((prompt) => {
                        if (!prompt) {
                            return <div className={styles.noPrompts}>No prompts found</div>
                        }
                        return(
                             prompts.map((
                                {prompt, _id}, index) => (
                              <Prompt key={index} prompt={prompt} onClick={()=>router.push(`/response/${_id}`)}
                              />
                            ))
                        )}
                    )
                }
            </InfiniteScroll>
        </>
    );
};

export default loadPrompts;

