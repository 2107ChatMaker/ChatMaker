import styles from './NavBar.module.sass';
import Link from 'next/link';
import {Explore, Star, Person, AddBox, ExitToApp} from '@mui/icons-material';
import { Icon } from "@mui/material";
import Image from 'next/image';
import {useState, useCallback} from 'react';
import {motion} from 'framer-motion';

function NavBar() {
    const [showMenu, setShowMenu] = useState(false);
    
    const memoOpenMenu = useCallback(()=>{setShowMenu(true)}, [showMenu]);
    const memoCloseMenu = useCallback(()=>{setShowMenu(false)}, [showMenu]);

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
            transition={{
                duration: 0.5
            }}
            className={`${styles.navbar} ${showMenu?styles.isOpen:""}`} 
            onMouseOver={memoOpenMenu}
            onMouseOut={memoCloseMenu}
            >
            <div className={styles.logo}>
                <div className={styles.logoImage}>
                    <Icon fontSize='large'>
                        <Image src={"/resources/Logo.svg"} width={"100%"} height={"100%"}/>
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
    )
}

export default NavBar;