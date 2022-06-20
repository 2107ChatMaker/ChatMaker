import Button from "@components/Button/Button";
import { useState } from "react";
import styles from "./CreatePromptForm.module.sass";


export default function CreatePrompt(){

    const [prompt, setPrompt] = useState("");

    const handleChange = (e) => {
        setPrompt(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //TO DO - submit prompt to server
    }


    

    return(
        <form onSubmit={handleSubmit}>
            <div className ={styles.page}>
                <div className={styles.pageTitle}>
                    Create Prompt
                    
                </div>
                <div className={styles.formInput}>
                    <textarea 
                    rows={5}
                    placeholder="Max number of words: 30 "
                    onChange={handleChange}
                    value={prompt}
                    required={true}
                    />
                </div>
                <div className={styles.formAction}>
                    <Button type="submit" >
                        Create
                    </Button>
                </div>
                <div className={styles.guidelinesTitle}>
                    Rules for submission:
                </div>
                <div className={styles.guidelines}>
                    <ul className={styles.rules}>
                        <li>Do not post anything offensive</li>
                        <li>The submission must make sense</li>
                        <li>Be respectful</li>
                    </ul>
                    <p className={styles.warning}>
                        Failure to observe any of these rules may result in a permanent ban
                        from this service. Thank you for your contribution to the community.    
                    </p>
                </div>
            </div>
        </form>
    );
}
