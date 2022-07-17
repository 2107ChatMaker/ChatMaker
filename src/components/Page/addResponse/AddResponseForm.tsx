
import { useState } from 'react';
import styles from './AddResponseHeader.module.sass';
import Button from '@components/Button/Button';
import Chip from '@mui/material/Chip';
import React from 'react';
import { useRouter } from 'next/router';

interface Props {
    userID: string,
    promptID: string,
};

export default function AddResponseForm(props: Props) {
    //setting the states for my data
    const [response, setResponse] = useState("");
    const [tempTag, setTempTag] = useState("");
    const [tags, setTags] = useState([]);
    const router = useRouter();
    //test cases, will be removed for production
    const promptID = props.promptID;
    const userID = props.userID;
    //handling the input from the response input
    const handleResponseChange = (e) => {
        setResponse(e.target.value);
    };
    //handling the tags input
    const handleTagsChange = (e) => {
        setTempTag(e.target.value);
        //splitting the tags up into an array by each comma
        setTags(tempTag.split(','));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //wrapping in a try catch in case anything goes wrong
        try {
            //gathering the data from the user
            const data = {
                userID,
                promptID,
                response,
                tags
            };
            //logging the data so we can see it works
            console.log(data);
            //doing a POST to the database
            const post = await fetch("http://localhost:3000/api/responsePage", 
                {
                    "method": "POST",
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "body": JSON.stringify(data)
                });
            //catching any errors that come out
        } catch (err) {
            console.log(err);
            };
        //since we already used the data, we will set these back to empty
        setResponse("");
        setTags([]);
        setTempTag("");
    };
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input type="text" id="newResponse" name="newResponse" placeholder="What is your response?" className={styles.responseInput} onChange={handleResponseChange} required />
            <input className={styles.tagInput} type="text" id="tempTag" name={tempTag} placeholder="Add Tags (separate by a comma)" required onChange={handleTagsChange}/>
            <div className={styles.secondRowDiv}>
                <Button type="submit">Add</Button>
                <div className={styles.tagDiv}>Tags:&nbsp;</div><div><Chip variant="outlined" size='small' label={tags[0]}  sx={{bgcolor: '#1D222E', color: '#ffffff'}}/>&nbsp;<Chip variant="outlined" size='small' label={tags[1]}  sx={{bgcolor: '#1D222E', color: '#ffffff'}}/>&nbsp;<Chip variant="outlined" size='small' label={tags[2]}  sx={{bgcolor: '#1D222E', color: '#ffffff'}}/></div>
            </div>
        </form>
    );
};