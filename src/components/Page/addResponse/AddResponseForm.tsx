//react imports
import { useState } from 'react';
import React from 'react';
//enum
import { Tag } from '@/utility/Enums/tag';
//material UI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
//component
import Button from '@components/Button';
//custom style
import styles from './AddResponseHeader.module.sass';
import axios from '@utils/constants/axios';


interface Props {
    userID: string,
    promptID: string,
};

export default function AddResponseForm(props: Props) {
    //setting the states for my response and tag data
    const [response, setResponse] = useState("");
    const [tags, setTags] = useState([]);

    //getting promptID and userID from the props that will be passed in by getServerSideProps when the page renders
    const promptID = props.promptID;
    const userID = props.userID;
    //creating a list of the tags we have in the Enum file
    const tagValues = Object.values(Tag);

    //handling the input from the response input
    const handleResponseChange = (e) => {
        setResponse(e.target.value);
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
            //doing a POST to the database
            const result = await axios.post("/api/response/", data);
            alert(result.data.message);
            //catching any errors that come out
        } catch (error) {
            alert(`${error.response.data.message}, please try agan later`);
        };
        //since we already used the data, we will set these back to empty
        setResponse("");
        setTags([]);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form} id="myform">
            {/* response input with HTML validation */}
            <input type="text" value={response} id="newResponse" name="newResponse" placeholder="What is your response?" className={styles.responseInput} onChange={handleResponseChange} maxLength={145} minLength={2} required />
            <label className={styles.labelStyle}>Tags:</label>
            {/*Reference: Material UI Autocomplete Docs*/}
            <Autocomplete
                multiple
                id="tags"
                options={tagValues}
                className={styles.menu}
                sx={{ bgcolor: '#FFFFFF', border: 'none' }}
                value={tags}
                getOptionDisabled={(tagValues) => (tags.length > 2 ? true : false)}
                onChange={(_event, newTag) => {
                    setTags(newTag);  
                }}
                size='small'
                renderInput={(params) => (
                <TextField
                    {...params}
                    variant="standard"
                    size='small'
                />
                )}
            /> 
            <div className={styles.secondRowDiv}>
                <Button type="submit">Add</Button>
            </div>
        </form>
    );
};