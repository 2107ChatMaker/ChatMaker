import styles from './Navbar.module.sass';
export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navItems}>
                <li className={`${styles.navItem} ${styles.navItemActive}`}>
                    REVIEW
                </li>
                <li className={`${styles.navItem} ${styles.navItemInActive}`}>
                    RESPONSE
                </li>
                <li className={`${styles.navItem} ${styles.navItemInActive}`}>
                    REUSE
                </li>
            </ul>
        </nav>
    )
}