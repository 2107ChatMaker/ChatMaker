import Avatar from './Avatar/Avatar';
import styles from './Header.module.sass';
import Logo from './Logo/Logo';
import Navbar from './Navbar/Navbar';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.head}>
                <Logo/>
                <Avatar src="/"/>
            </div>
            <Navbar/>
        </header>
    )
}