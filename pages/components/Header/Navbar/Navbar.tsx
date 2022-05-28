import styles from './Navbar.module.sass';
import {useState} from 'react';

interface Tab {
    tabName: string;
    tabActive: boolean;
}

export default function Navbar() {

    //tabs state to keep track of the active tab
    const [tabs, setTabs] = useState<Tab[]>([
        { tabName: 'REVIEWS', tabActive: true },
        { tabName: 'RESPONSE', tabActive: false },
        { tabName: 'REUSE', tabActive: false },
    ]);

    //function to change the active tab
    const changeTab = (tabName: string) => {
        setTabs(
            tabs.map(tab => {
                if (tab.tabName === tabName) {
                    tab.tabActive = true;
                } else {
                    tab.tabActive = false;
                }
                return tab;
            })
        );
    }

    return (
        <nav className={styles.navbar}>
            <ul className={styles.navItems}>
                {tabs.map(tab => (
                    <li 
                    className={`${styles.navItem} ${tab.tabActive ? styles.navItemActive : ''}`}
                    key={tab.tabName} 
                    onClick={()=>changeTab(tab.tabName)}>
                        {tab.tabName}
                    </li>
                ))}
            </ul>
        </nav>
    )
}
