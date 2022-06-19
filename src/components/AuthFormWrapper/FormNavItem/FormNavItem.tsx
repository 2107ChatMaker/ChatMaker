import { useRouter } from "next/router";
import Link from "next/link";
import styles from './FormNavItem.module.sass';
import { ReactNode } from "react";

interface FormNavItemProps {
    direction: 'login' | 'signup';
    children: ReactNode;
}

export default function FormNavItem({children, direction}: FormNavItemProps) {
    
    //router for checking if user is in login or signup page
    const router = useRouter();
    
    //show indicator isActive if user is in login or signup page
    return (
        <li className={
            `${styles.navItem}  
             ${router.pathname === `/auth/${direction}` ? styles.isActive : ''}`
            }>
            <Link href={`/auth/${direction}`}>
                {children}
            </Link>
        </li>
    );
}