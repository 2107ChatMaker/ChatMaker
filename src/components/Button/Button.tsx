import styles from './Button.module.sass';

//props type
interface ButtonProps {
    type: 'submit' | 'button';
    onClick?: () => void;
    children: React.ReactNode;
    variant?: 'secondary' | 'primary' | 'alert';
}

export default function Button(props: ButtonProps) {
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