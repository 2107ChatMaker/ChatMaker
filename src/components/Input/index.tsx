import styles from './Input.module.sass';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState, ReactNode, ChangeEvent } from 'react';

interface InputProps {
    type: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
    required?: boolean;
    children?: ReactNode;
}

export default function Input(props: InputProps) {

    //states for managing the input type password
    const [type,setType] = useState(props.type);
    const [showPassword, setShowPassword] = useState(false);
    
    //toggle password visibility
    const passwordVisibleToggle = () => {
        setShowPassword(!showPassword);
        if (showPassword) {
            setType('password');
        } else {
            setType('text');
        }
    };

    return (
        <>
            <div className = {styles.inputContainer}>
            {props.children}
            <input
                type={type}
                placeholder={props.placeholder}
                className={styles.input}
                onChange={props.onChange}
                value={props.value}
                name={props.name}
                required={props.required}
            />
            {
                props.type === 'password' &&  
                <>
                    {!showPassword?
                        <Visibility onClick={passwordVisibleToggle} color='disabled'/>:
                        <VisibilityOff onClick={passwordVisibleToggle} color='disabled'/>
                    }
                </>
            }
            </div>
            {props.error !== ""?<div className={styles.error}>{props.error}</div>:null}
        </>
    );
}


