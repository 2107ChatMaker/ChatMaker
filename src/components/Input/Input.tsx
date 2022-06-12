import styles from './Input.module.sass';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
export default function Input(props) {
    return (
     <div className = {styles.inputContainer}>
        {props.children}
        <input
            type={props.type}
            placeholder={props.placeholder}
            className={styles.input}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
            required={props.required}
        />
     </div>
        
    )
}