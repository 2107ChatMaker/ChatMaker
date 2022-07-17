import styles from './AuthFormWrapper.module.sass';
import FormNavItem from './FormNavItem';
import FormLogo from './FormLogo';
import FormLink from './FormLink';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import Introduction from '@components/Introduction';

//props type
interface AuthFormWrapperProps {
    children: ReactNode;
}

export default function AuthFormWrapper({children}: AuthFormWrapperProps) {
    
    return (
        <div className={styles.container}>
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
                    <Introduction/>
                </div>
            </motion.div>
            <div className={styles.mobileIntroduction}>
                <Introduction/>
            </div>
        </div>
    );
}

