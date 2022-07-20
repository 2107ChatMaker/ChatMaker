import styles from './SideNavBar.module.sass';
import { Icon } from "@mui/material";
import Image from 'next/image';
import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import NavItem from './SideNavItem';
import { signOut, useSession } from 'next-auth/react';
import animation from "@utils/constants/animations/sidenavbar";

export default function SideNavBar() {
    
    //user session
    const { data: session } = useSession();

    //list of tabs
    const [tabs, setTabs] = useState([]);

    //menu visibility state
    const [showMenu, setShowMenu] = useState(false);

    //set links base on screen size
    useEffect(()=>{

        //set tab for navigation
        if (session && session.user) {
            setTabs(["Explore prompts", "Rate responses", "Add a prompt", "Profile", "Logout"]);
        } else {
            setTabs(["Explore prompts", "Login"]);
        }
        //clean up event listener
        return ()=>{
            window.removeEventListener('onMouseEnter', openMenu);
            window.removeEventListener('onMouseLeave', closeMenu);
        };
    }, [session]);


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
            custom={showMenu}
            animate={showMenu ? 'visible' : 'hidden'}
            variants={animation}
            initial="hidden"
            className={`${styles.navBar}`} 
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
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
                {tabs.map((tab, index)=>{
                    return (
                        <NavItem name={tab} key={index} onClick={tab==="Logout"?()=>signOut():null}/>
                    );
                })}
            </ul>            
        </motion.div>
    );
}
 