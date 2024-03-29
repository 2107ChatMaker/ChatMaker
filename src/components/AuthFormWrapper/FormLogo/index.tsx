//react imports
import Image from 'next/image';
import { motion } from 'framer-motion';

//our custom global sass file
import styles from './FormLogo.module.sass';


export default function FormLogo() {
    return (
        <motion.div 
            animate={{
                width: "auto",
                height: "auto",
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
            className={styles.formLogo}>
            <div className={styles.logo}>
                <Image 
                    width={"100%"} 
                    height={"100%"} 
                    src={"/resources/Logo.svg"} 
                    alt={"Logo"} 
                    layout={"responsive"}
                />
            </div>
            <p className={styles.logoText}>
                ChatMaker
            </p>
        </motion.div>
    );
}