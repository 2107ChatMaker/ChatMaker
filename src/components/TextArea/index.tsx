import styles from './TextArea.module.sass';
import { ChangeEventHandler } from 'react';

interface Props{
    value: string,
    onChange: ChangeEventHandler<HTMLTextAreaElement>,
    placeholder?: string,
    require?: boolean,
    error?: string,
    name: string
}

export default function TextArea(props: Props){
    return(
        <div className={styles.textarea}>
            <textarea
                className={styles.input}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                required={props.require}
                name={props.name}
            />
        </div>
    )
}