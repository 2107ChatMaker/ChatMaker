import styles from "./RateButton.module.sass";
import {ReactNode} from "react";
import {motion} from "framer-motion";

interface Props {
    onClick: () => void;
    children: ReactNode;
}

export default function RateButton(props: Props) {
    const {onClick, children} = props;
    return (
        <motion.button 
            whileTap={{scale: 0.9, backgroundColor: "#D96E82"}}
            whileHover={{backgroundColor: "#D96E82"}}
            className={styles.button} 
            onClick={onClick}>
            {children}
        </motion.button>
    );
}