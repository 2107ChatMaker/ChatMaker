import styles from './NavBar.module.sass';
import { Icon } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import NavItem from './NavItem/NavItem';
import { signOut, useSession } from 'next-auth/react';

function NavBar() {
    
    //user session
    const { data: session } = useSession();

    //list of nav link
    const [links, setLinks] = useState([]);

    //menu visibility state
    const [showMenu, setShowMenu] = useState(false);

    //track screen size
    const isMobile = useMediaQuery('(max-width: 768px)');

    //set links base on screen size
    useEffect(()=>{

        //setting up navigation links
        if (isMobile) {
            if (session && session.user) {
                setLinks(["Explore", "Profile", "Rating"]);
            } else {
                setLinks(["Explore", "Login", "Rating"]);
            }
            
        } else {
            if (session && session.user) {
                setLinks(["Explore prompts", "Rate responses", "Add a prompt", "Profile", "Logout"]);
            } else {
                setLinks(["Explore prompts", "Login"]);
            }
        }

        //clean up event listener
        return ()=>{
            window.removeEventListener('onMouseEnter', openMenu);
            window.removeEventListener('onMouseLeave', closeMenu);
        };
    }, [isMobile, session]);


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
                delay: 0.3
            },
        }),
        hidden: {
            width: "4.5rem",
            transition: {
                stiffness: 0,
            }
        },
    } : {
        mobile: {
            width: "100%",
            height: "5rem",
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
                        <NavItem name={link} key={index} onClick={link==="Logout"?()=>signOut():null}/>
                    );
                })}
            </ul>            
        </motion.div>
    );
}

export default NavBar;