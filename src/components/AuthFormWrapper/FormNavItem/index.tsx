//react imports
import Link from "next/link";

import { useRouter } from "next/router";

import { ReactNode } from "react";

//utils
import { paths } from "@utils/constants/paths";

//custom global sass file
import styles from './FormNavItem.module.sass';


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
             ${router.pathname === paths[direction] ? styles.isActive : ''}`
            }>
            <Link href={paths[direction]}>
                {children}
            </Link>
        </li>
    );

}