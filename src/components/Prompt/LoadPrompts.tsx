// interfaces
import { Prompt as promptInterface} from "@interfaces/Prompt";

//mui
import { CircularProgress } from "@mui/material";

//axios
import axios from "axios";

//react
import { useState, useEffect } from "react";

//components
import InfiniteScroll from "react-infinite-scroll-component";
import Prompt from "./index";

//next
import router from "next/router";

//style
import styles from '@styles/ExplorePrompts.module.sass';


//interface with the types that will be held
interface PromptProps {
    retrievedPrompts: promptInterface[],
    prompts,
    setPrompts
};

const LoadPrompts = ({prompts, setPrompts}: PromptProps) => {

    //setting variables to hold each item
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);

    // reference: https://stackoverflow.com/questions/42898009/multiple-fields-with-same-key-in-query-params-axios-request
    const getNewPrompts = async () => {
        const newSkip = skip + 10;
        setSkip(newSkip);

        //getting a list of the IDs of the responses already rendered
        // this variable allows us to pass in multiple variables to our axios get request
        var params = new URLSearchParams();
        params.append('skip', String(newSkip));

        //making an axios get request to our response API, passing in the retrieved ID list
        const res = await axios.get(`/api/prompt`, {
            params: params}
        );

        const { retrievedPrompts, numberOfPrompts } = res.data;

        if (retrievedPrompts.length > 0 && prompts.length < numberOfPrompts) {

            //getting the responses and the retrieved IDs back from the database, and then adding them to the lists
            setPrompts((prompts) => prompts.concat(retrievedPrompts[0]));
        } else {
            setHasMore(false);
        }
        console.log("prompts", prompts);
    };

    if (prompts.lengt < 1 ) {
        return (
            <div className={styles.noPrompts}>no prompt found</div>
        );
    }

    return (
        <>
            <InfiniteScroll
            dataLength={skip*10}
            next={getNewPrompts}
            hasMore={hasMore}
            loader={<div><CircularProgress/></div>}
            endMessage={<h4>Nothing more to show</h4>}
            className={styles.prompts}
            scrollableTarget="scrollableDiv"
            >
                {   
                    prompts.map((prompt, index) => {
                        return(
                            <Prompt  
                                key={index} 
                                prompt={prompt.prompt} 
                                onClick={()=>router.push(`/response/${prompt._id}`)}
                            />
                        );
                    })
                }
            </InfiniteScroll>
        </>
    );
};

export default LoadPrompts;

