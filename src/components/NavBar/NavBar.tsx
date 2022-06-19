import styles from './NavBar.module.sass';
import Link from 'next/link';
import {Explore, Star, Person, AddBox, ExitToApp} from '@mui/icons-material';
import { Icon } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import {useState} from 'react';
import {motion} from 'framer-motion';

function NavBar() {
    
    //menu visibility state
    const [showMenu, setShowMenu] = useState(false);

    //track screen size
    const isMobile = useMediaQuery('(max-width: 768px)');

    //function to show sidebar
    const openMenu = ()=>{
        setShowMenu(true);
    };

    //function to hide sidebar
    const closeMenu = ()=>{
        setShowMenu(false);
    };

    //variables for sidebar animation
    const animationVariant = !isMobile? {
        visible: i => ({
            width: "17rem",
            transition: {
                duration: 0.5,
            },
        }),
        hidden: {width: "4.5rem"},
    } : {
        visible: {width: "100%"},
        hidden: {width: "100%"},
    };

    return (
        <motion.div 
            custom={showMenu}
            animate={showMenu ? 'visible' : 'hidden'}
            variants={animationVariant}
            className={`${styles.navBar}`} 
            onMouseOver={!isMobile?openMenu:null}
            onMouseOut={!isMobile?closeMenu:null}
            >
            <div className={styles.logo}>
                <div className={styles.logoImage}>
                    <Icon fontSize='large'>
                        <Image src={"/resources/Logo.svg"} width={"100%"} height={"100%"} alt="Logo"/>
                    </Icon>
                </div>
                <div className={styles.logoText}>ChatWriter</div>
            </div>
            <ul className={styles.navItems}>
                <li className={`${styles.navItem} ${styles.explore}`}>
                    <Link href="/">
                        <>
                            <div className={styles.navItemIcon}>
                                <Explore fontSize='large'/> 
                            </div>
                            <a className={styles.link}>
                                Explore
                            </a>
                        </>
                        
                    </Link>
                </li>
                <li className={`${styles.navItem} ${styles.rating}`}>
                    <Link href="/">
                        <>
                            <div className={styles.navItemIcon}>
                                <Star fontSize='large'/>
                            </div>
                            
                            <a className={styles.link}>
                                Rating
                            </a>
                        </>
                        
                    </Link>
                </li>
                <li className={`${styles.navItem} ${styles.addPrompt}`}>
                    <Link href="/">
                        <>
                            <div className={styles.navItemIcon}>
                                <AddBox fontSize='large'/>
                            </div>
                            
                            <a className={styles.link}>
                                Add a prompt
                            </a>
                        </>
                    </Link>
                </li>
                <li className={`${styles.navItem} ${styles.profile}`}>
                    <Link href="/">
                        <>
                            <div className={styles.navItemIcon}>
                                <Person fontSize='large'/>
                            </div>
                            
                            <a className={styles.link}>
                                Profile
                            </a>
                        </>
                    </Link>
                </li>
                <li className={`${styles.navItem} ${styles.logOut}`}>
                    <Link href="/">
                        <>
                            <div className={styles.navItemIcon}>
                                <ExitToApp fontSize='large'/>
                            </div>
                            
                            <a className={styles.link}>
                                Logout
                            </a>
                        </>
                    </Link>
                </li>
            </ul>            
        </motion.div>
    );
}

export default NavBar;