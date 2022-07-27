//react imports
import { ReactNode, useState } from "react";

//mongoose imports
import { ObjectId } from "mongoose";

//utils
import axios from "@utils/constants/axios";

//material UI
import LibraryAddOutlinedIcon from '@mui/icons-material/LibraryAddOutlined';
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';

//custom style
import styles from './ResponseDiv.module.sass';

//next-auth
import { getSession } from "next-auth/react";


interface Props {
    children?: ReactNode
    response: string
    userID: string
    thisPromptID: string
    responseID: string | ObjectId
    tags: string[]
};

export default function ResponseDiv(props: Props){

    //setting variables hold the state of the response icon, we will change it based on the state
    const [iconBool, setIconBool] = useState(false);

    //saved response to user
    async function saveResp() {
        
        //set the post request values
        let values = {
            responseID: props.responseID
        };
        const session = await getSession();
        const id = session.user.id;

        try {

            //make a post request to save the response to user
            const response = await axios.post(`/api/user/${id}/response/save`,values);
        } catch(error) {
            alert(error);
        }
    }

    //reference https://stackoverflow.com/questions/58257228/how-to-switch-materialui-icon-when-clicked
    const libraryOnClick = () => {
        saveResp();
        setIconBool(true);
    };
    
    if (!props.tags) {
        return;
    }

    return(
        <>
        <div className={styles.background}>
            <div className={styles.backgroundContent} >
            <div className={styles.responseBox}>{props.response}</div>
            <div className={styles.tagsContainer}>Tags: &nbsp;
            {props.tags.length > 0 && props.tags.map((tag, index) => (
                <Chip variant="outlined" size="small" label={tag} sx={{bgcolor: '#1D222E', color: '#ffffff'}} key={index}/>
            ))}
            </div>
                <button className={styles.libraryAdd} onClick={libraryOnClick}>
                        {
                            iconBool ? <CheckIcon /> : <LibraryAddOutlinedIcon fontSize="medium"/>
                        }
                </button>
            </div>
        </div>
        </>
    );
};