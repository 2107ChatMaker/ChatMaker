import styles from './NavBar.module.sass';
import { Icon } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import NavItem from './NavItem/NavItem';

function NavBar() {
    
    const [links, setLinks] = useState([]);

    //menu visibility state
    const [showMenu, setShowMenu] = useState(false);

    //track screen size
    const isMobile = useMediaQuery('(max-width: 498px)');

    //set links base on screen size
    useEffect(()=>{
        if (isMobile) {
            setLinks(["Explore", "Profile", "Rating"]);
        } else {
            setLinks(["Explore prompts", "Rate responses", "Add a prompt", "Profile", "Logout"]);
        }

        //clean up event listener
        return ()=>{
            window.removeEventListener('onMouseEnter', openMenu);
            window.removeEventListener('onMouseLeave', closeMenu);
        };
    }, [isMobile]);
 

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
        hidden: {
            width: "4.5rem",
            
        },
    } : {
        mobile: {
            width: "100%",
            transition: {
                duration: 0,
            }
        }
    };

    return (
        <motion.div 
            custom={showMenu}
            animate={!isMobile?showMenu ? 'visible' : 'hidden':'mobile'}
            variants={animationVariant}
            initial="hidden"
            className={`${styles.navBar}`} 
            onMouseEnter={!isMobile?openMenu:null}
            onMouseLeave={!isMobile?closeMenu:null}
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
                {links.map((link, index)=>{
                    return (
                        <NavItem name={link} key={index}/>
                    );
                })}
            </ul>            
        </motion.div>
    );
}

export default NavBar;