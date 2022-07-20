import { ReactNode } from "react";
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import Chip from '@mui/material/Chip';
import styles from '@components/Page/responseDiv/ResponseDiv.module.sass';
import * as React from 'react';
import { ObjectId } from "mongoose";
import axios from "@utils/constants/axios";

interface Props {
    children?: ReactNode
    prompt: string
    userID: string
    thisPromptID: string
    responseID: string | ObjectId
    tags: string[]
};

export default function ResponseDiv(props: Props){
    //saved response to user
    async function saveResp(userID: string, responseID: string) {
        //set the post request values
        let values = {
            responseID
        };

        try {
            //make a post request to save the response to user
            const response = await axios.post(`/api/user/${userID}/response/save`,values);
        } catch(error) {
            console.log(error.response);
        }
    }
    return(
        <>
        <div className={styles.background}>
            <div className={styles.backgroundContent} >
            <div className={styles.responseBox}>{props.prompt}</div>
            <div className={styles.tagsContainer}>Tags: &nbsp;
            {props.tags.length > 0 && props.tags.map((tag, index) => (
                <Chip variant="outlined" size="small" label={tag} sx={{bgcolor: '#1D222E', color: '#ffffff'}} key={index}/>
            ))}
            </div>
            <button className={styles.libraryAdd} onClick={() => saveResp(props.userID, props.responseID as string)}><LibraryAddOutlinedIcon fontSize="medium"/></button>
            </div>
        </div>
        </>
    );
};