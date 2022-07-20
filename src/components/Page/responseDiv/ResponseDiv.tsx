//react imports
import { ReactNode } from "react";
import * as React from 'react';
//mongoose imports
import { ObjectId } from "mongoose";
//material UI
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import Chip from '@mui/material/Chip';
//custom style
import styles from '@components/Page/responseDiv/ResponseDiv.module.sass';


interface Props {
    
    children?: ReactNode
    prompt: string
    userID: string
    thisPromptID: string
    responseID: string | ObjectId
};

export default function ResponseDiv(props: Props){
    
    async function saveResp(userID: string, responseID: string){
        let values = {
            userID,
            responseID
        };
        const body = JSON.stringify(values);
        const response = await fetch(
            'http://localhost:3000/api/responsePage',
            {  
                method: 'PUT',
                body: body,
                headers: new Headers({
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                }),
            }
        );
    }

    return(
        <>
        <div className={styles.background}>
            <div className={styles.backgroundContent} >
            <div className={styles.responseBox}>{props.prompt}</div>
            <div className={styles.tagsContainer}>Tags: &nbsp;
            <Chip variant="outlined" size="small" label={props.children[0]} sx={{bgcolor: '#1D222E', color: '#ffffff'}} />
            <Chip variant="outlined" size="small" label={props.children[1]} sx={{bgcolor: '#1D222E', color: '#ffffff'}} />
            <Chip variant="outlined" size="small" label={props.children[2]} sx={{bgcolor: '#1D222E', color: '#ffffff'}} />
            </div>
            <button className={styles.libraryAdd} onClick={() => saveResp(props.userID, props.responseID as string)}><LibraryAddOutlinedIcon fontSize="medium"/></button>
            </div>
        </div>
        </>
    );
};