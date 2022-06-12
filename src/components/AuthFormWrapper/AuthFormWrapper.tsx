import styles from './AuthFormWrapper.module.sass';
import FormNavItem from './FormNavItem/FormNavItem';
import FormLogo from './FormLogo/FormLogo';
import FormLink from './FormLink/FormLink';

export default function AuthFormWrapper({children}) {
    
    return (
        <div className={styles.formWrapper}>
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
        </div>
    )
}

