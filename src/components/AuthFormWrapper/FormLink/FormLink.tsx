import styles from './FormLink.module.sass';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function FormLink() {

    //router for checking if user is in login or signup page
    const router = useRouter();
    
    //if user is in login page, link to signup page, else link to login page
    if (router.pathname === '/auth/signup') {
        return (
            <p className={styles.linkText}>
                Already have an account?
                <Link href="/auth/login">
                    <a className={styles.link}> Login</a>
                </Link>
            </p>
        )
    } else {
        return (
            <p className={styles.linkText}>Don't have an account?
                <Link href="/auth/signup">
                    <a className={styles.link}> Sign up</a>
                </Link>
            </p>
        )
    }
}
