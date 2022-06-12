import { useRouter } from "next/router";
import Link from "next/link";
import styles from './FormNavItem.module.sass';
export default function FormNavItem({children, direction}) {
    const router = useRouter();
    return (
        <li className={
            `${styles.navItem}  
             ${router.pathname === `/auth/${direction}` ? styles.isActive : ''}`
            }>
            <Link href={`/auth/${direction}`}>
                {children}
            </Link>
        </li>
    )
}