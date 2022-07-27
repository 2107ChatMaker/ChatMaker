//react imports
import Link from 'next/link';
import { useRouter } from 'next/router';

//utils
import { paths } from '@utils/constants/paths';

//our custom global sass file
import styles from './FormLink.module.sass';


export default function FormLink() {

    //router for checking if user is in login or signup page
    const router = useRouter();
    
    //if user is in login page, link to signup page, else link to login page
    if (router.pathname === paths.signup) {
        return (
            <p className={styles.linkText}>
                Already have an account?
                <Link href={paths.login}>
                    <a className={styles.link}> Login</a>
                </Link>
            </p>
        );
    
    } else {
        return (
            <p className={styles.linkText}>Don&apos;t have an account?
                <Link href={paths.signup}>
                    <a className={styles.link}> Sign up</a>
                </Link>
            </p>
        );
    }
}
