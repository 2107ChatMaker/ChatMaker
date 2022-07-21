//react imports
import { motion } from 'framer-motion';
//custom sass
import styles from "./Introduction.module.sass";


export default function About() {
    return (
        <motion.div 
            animate={{
                opacity: 1,
                scale: 1
            }}
            initial={{
                opacity: 0,
                scale: 0
            }}
            transition={{
                duration: 0.5,
            }}
            className={styles.introduction}>
            <h1 className={styles.title}>About</h1>
            <p>
                ChatWriter is an online creative writing tool for developers. 
            </p>
            <p>
                Developers can submit prompts and recieve a crowed sources 
                of responses to use in their creative endevours
            </p>
        </motion.div>
    );
}