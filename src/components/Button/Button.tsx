import styles from './Button.module.sass';
<<<<<<< HEAD

=======
>>>>>>> fb599f5 (update signup&login form)
export default function Button(props) {
    return (
        <button
         type={props.type}
         onClick={props.onClick}
         className={
            `${styles.button}
             ${props.variant? `${styles[props.variant]}`: ''}}   
            `
            }>
            {props.children}
        </button>
    )
}