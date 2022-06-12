import styles from './Input.module.sass';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import {useState} from 'react';

export default function Input(props) {
    const [type,setType] = useState(props.type);
    const [showPassword, setShowPassword] = useState(false)
    
    const passwordVisibleToggle = () => {
        setShowPassword(!showPassword);
        showPassword? setType('password'): setType('text');
    }

    return (
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
    )
}


