//react imports
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
//material UI
import { Icon } from "@mui/material";
//component
import NavItem from './SideNavItem';
//animation logic
import animation from "@utils/constants/animations/sidenavbar";
//custom style
import styles from './SideNavBar.module.sass';

export default function SideNavBar() {
    
    //user session
    const { data: session } = useSession();

    //menu visibility state
    const [showMenu, setShowMenu] = useState(false);

    //set tabs
    const tabs = useMemo(()=> {
        if (session && session.user) {
            return ["Explore prompts", "Rate responses", "Add a prompt", "Profile", "Logout"];
        } 
        return ['Rate', 'Explore', 'Login'];
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
                <div className={styles.logoText}>ChatMaker</div>
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
 