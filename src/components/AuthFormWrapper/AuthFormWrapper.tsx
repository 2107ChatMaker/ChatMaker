import styles from './AuthFormWrapper.module.sass';
import FormNavItem from './FormNavItem/FormNavItem';
import FormLogo from './FormLogo/FormLogo';
import FormLink from './FormLink/FormLink';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

//props type
interface AuthFormWrapperProps {
    children: ReactNode;
}

export default function AuthFormWrapper({children}: AuthFormWrapperProps) {
    return (
        <motion.div
        animate={{
            width: "70%",
        }}
        initial={{
            width: "65%",
        }}
        className={styles.formWrapper}>
            <div className={styles.formContainer}>
                <div className={styles.formNav}>
                    <ul className={styles.navItems}>
                        <FormNavItem direction={"login"}>
                            Login
                        </FormNavItem>
                        <FormNavItem direction={"signup"}>
                            Signup
                        </FormNavItem>
                    </ul>
                </div>
                <div className={styles.form}>
                    <div className={styles.mobileLogo}>
                        <FormLogo/>
                    </div>
                    {children}
                    <FormLink/>
                </div>
            </div>
            <div className={styles.logo}>
                <FormLogo/>
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
                    <p>
                        ChatWriter is an online creative writing tool for developers. 
                    </p>
                    <p>
                        Developers can submit prompts and recieve a crowed sources 
                        of responses to use in their creative endevours
                    </p>
                </motion.div>
                
            </div>
        </motion.div>
    );
}

