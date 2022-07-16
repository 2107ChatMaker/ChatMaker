import Button from "@components/Button/Button";
import { useState } from "react";
import styles from "./CreatePromptForm.module.sass";
import { useSession } from "next-auth/react";
import useForm from "@hook/useForm";
import TextArea from "@components/TextArea";



export default function CreatePrompt(){

    
    const { data: session } = useSession();


    const onAddPrompt = () => {
        console.log(session);
    };
    
    const validatePrompt = ({prompt}) => {

        if (prompt.length < 10) {
            return {
                prompt: "Prompt must be at least 10 characters long"
            };
        }
        return {};
    }

    const [form, errors, handleChange, handleSubmit] = useForm({prompt : "" }, validatePrompt, onAddPrompt);
    

    return(
        <form onSubmit={handleSubmit}>
            <div className ={styles.page}>
                <div className={styles.pageTitle}>
                    Create a new prompt
                    
                </div>
                    <TextArea
                        value={form.prompt}
                        onChange={handleChange}
                        placeholder="Enter your prompt here"
                        require={true}
                        name="prompt" 
                    />
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
