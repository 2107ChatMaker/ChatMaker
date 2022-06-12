import styles from './Button.module.sass';
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