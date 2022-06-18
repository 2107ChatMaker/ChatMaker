import styles from './FormLink.module.sass';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function FormLink() {
    const router = useRouter();
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
