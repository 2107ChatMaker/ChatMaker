import styles from './Button.module.sass';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

//props type
interface ButtonProps {
    type: 'submit' | 'button';
    onClick?: () => void;
    children: ReactNode;
    variant?: 'secondary' | 'primary' | 'alert';
}

export default function Button(props: ButtonProps) {
    return (
        <motion.button
         whileTap={{scale: 0.9, backgroundColor: "#181D27"}}
         whileHover={{backgroundColor: "#181D27"}}
         type={props.type}
         onClick={props.onClick}
         className={
            `${styles.button} 
             ${props.variant? styles[props.variant]: ''}  
            `
            }>
            {props.children}
        </motion.button>
    );
}