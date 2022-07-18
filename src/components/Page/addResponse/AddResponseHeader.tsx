import {ReactNode} from "react";
import styles from './AddResponseHeader.module.sass';
import AddResponseForm from './AddResponseForm';

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
    )
};