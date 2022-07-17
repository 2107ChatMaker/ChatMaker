import { ReactNode } from "react";

import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import Chip from '@mui/material/Chip';
import styles from '@components/Page/responseDiv/ResponseDiv.module.sass';

import * as React from 'react';

interface Props {
    
    children?: ReactNode
    prompt: string
};

async function handleOnClick() {
    //add post to the user's personal list
};

export default function ResponseDiv(props: Props){
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
            <button  className={styles.libraryAdd} onClick={handleOnClick}><LibraryAddOutlinedIcon fontSize="medium"/></button>
            </div>
        </div>
        </>
    )
};