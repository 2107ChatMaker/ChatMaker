import styles from './NavBar.module.sass';
import Link from 'next/link';
import {Explore, Star, Person, AddBox, ExitToApp} from '@mui/icons-material';
import { Icon } from "@mui/material";
import Image from 'next/image';
import {useState} from 'react';
import {motion} from 'framer-motion';

function NavBar() {
    
    //menu visibility state
    const [showMenu, setShowMenu] = useState(false);
    
    //function to show sidebar
    const openMenu = ()=>{
            setShowMenu(true);
        };

    //function to hide sidebar
    const closeMenu = ()=>{
        setShowMenu(false);
    };

    return (
        <motion.div 
            animate= {
                showMenu ? {
                    width: "17rem"
                }:{
                    width: "4.5rem"
                }
            }
            initial={{width: "4.5rem"}}
            transition={{duration: 0.5}}
            className={`${styles.navBar}`} 
            onMouseOver={openMenu}
            onMouseOut={closeMenu}
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
                <li className={styles.navItem}>
                    <Link href="/">
                        <>
                            <div className={styles.navItemIcon}>
                                <Explore fontSize='large'/> 
                            </div>
                            <a className={styles.link}>
                                Explore prompts
                            </a>
                        </>
                        
                    </Link>
                </li>
                <li className={styles.navItem}>
                    <Link href="/">
                        <>
                            <div className={styles.navItemIcon}>
                                <Star fontSize='large'/>
                            </div>
                            
                            <a className={styles.link}>
                                Rate responses
                            </a>
                        </>
                        
                    </Link>
                </li>
                <li className={styles.navItem}>
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
                <li className={styles.navItem}>
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
                <li className={styles.navItem}>
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