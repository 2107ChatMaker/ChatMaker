import styles from './SideNavItem.module.sass';
import Link from 'next/link';
import getTabLinkAndIcon  from '@utils/navigation/GetTabLinkAndIcon';
import { useRouter } from 'next/router';

export default function NavItem({name, onClick}: {name: string, onClick?: () => void}) {
    
    //router for checking which tab is active
    const router = useRouter();

    //get link and icon for nav item
    const { href, icon } = getTabLinkAndIcon(name);

    return (
        <Link href={href}>
            <li className={`${styles.navItem} ${
                router.asPath === href && name !== "Logout"? styles.isActive : ''
            }`} onClick={onClick}>    
                <div className={styles.navItemIcon}>
                {icon}  
                </div>
                <a className={styles.link}>
                    {name} 
                </a>
            </li>
        </Link>
    );
}