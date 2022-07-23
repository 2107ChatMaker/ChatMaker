//react imports
import { ReactNode } from "react";
//component
import AddResponseForm from './AddResponseForm';
//custom style
import styles from './AddResponseHeader.module.sass';

interface Props {
    prompt: string,
    promptID: string,
    userID: string,
    children?: ReactNode
};

export default function AddResponseHeader(props: Props) {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.headerDiv}>
                    {props.prompt}
                </div>
                <AddResponseForm userID={props.userID} promptID={props.promptID}/>
            </div> 
        </>
    );
};