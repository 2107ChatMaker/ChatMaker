
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
//import styles from './Prompt.module.sass';


//interface with the types that will be held
interface PromptProps {
    retrievedPrompts: promptInterface[]
};

const LoadPrompts = (data: PromptProps) => {
    //setting variables to hold each item
    const [prompts, setPrompts] = useState(data.retrievedPrompts);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0)
    console.log("loadprompts ",prompts)
    

    // reference: https://stackoverflow.com/questions/42898009/multiple-fields-with-same-key-in-query-params-axios-request
    const getNewPrompts = async () => {
        setSkip(skip + 10)
        //getting a list of the IDs of the responses already rendered
        // this variable allows us to pass in multiple variables to our axios get request
        var params = new URLSearchParams();
        params.append('skip', String(skip))
        //making an axios get request to our response API, passing in the retrieved ID list
        const res = await axios.get(`/api/prompt`, {
            params: params}
        );
        //getting the responses and the retrieved IDs back from the database, and then adding them to the lists
        setPrompts((prompts) => [...prompts, ...res.data.retrievedPrompts])
    }

    
    return (
        <>
            <InfiniteScroll
            dataLength={prompts.length}
            next={getNewPrompts}
            hasMore={hasMore}
            loader={<div><CircularProgress/></div>}
            endMessage={<h4>Nothing more to show</h4>}
            className={styles.prompts}
            >
                {   
                    prompts.map((prompt) => {
                        return(
                            // <div key={String(prompt._id)}>
                                <Prompt  key={String(prompt._id)} prompt={prompt.prompt} onClick={()=>router.push(`/response/${prompt._id}`)}/>
                            // </div>
                        )
                    })
                }
            </InfiniteScroll>
        </>
    );
};

export default LoadPrompts;

