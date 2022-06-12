import styles from './AuthFormWrapper.module.sass';
import FormNavItem from './FormNavItem/FormNavItem';
import FormLogo from './FormLogo/FormLogo';
import FormLink from './FormLink/FormLink';
<<<<<<< HEAD
import {motion} from 'framer-motion';


export default function AuthFormWrapper({children}) {
    return (
        <motion.div
        animate={{
            width: "70%"
        }}
        initial={{
            width: "65%"
        }}
        className={styles.formWrapper}>
=======

export default function AuthFormWrapper({children}) {
    
    return (
        <div className={styles.formWrapper}>
>>>>>>> fb599f5 (update signup&login form)
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
            </div>
<<<<<<< HEAD
        </motion.div>
=======
        </div>
>>>>>>> fb599f5 (update signup&login form)
    )
}

