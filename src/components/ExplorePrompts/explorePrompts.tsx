import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import searchIcon from "./searchIcon.png";
import styles from "./explorePrompts.module.sass";
import addIcon from "./pencilSquare.png";

export default function ExplorePrompt(){

 

    return(
        <div className={styles.page}>
            <div className={styles.mobileView}>
                <div className={styles.mobilePageTitle}>
                    Explore
                </div> <div className={styles.mobileAdd}> 
                    Add &nbsp; <Image src={addIcon} width={"40%"} height={"20%"} alt="addIcon"/>
            
                </div>
            </div>
            <div className={styles.mobilePageTitle}>
                Explore
            </div>
            <div className={styles.mobileAdd}> 
                Add <Image src={addIcon} width={"25%"} height={"30%"} alt="addIcon"/>
            
            </div>
            <div className={styles.pageTitle}>
                Explore Prompts
            </div>
            <div className={styles.searchField}>
                <input className={styles.input} placeholder="search for prompts" type="text" id="searchParam" size={70} name="sarchParam"/>
                <button type="submit" className={styles.searchButton}>
                    <Image className={styles.buttonImage} src={searchIcon} width={"20%"} height={"20%"} alt="seachImage"/>
                </button>
                <br/>
            </div>
            <div className={styles.prompts}>
                fun prompt
            </div>
            <div className={styles.prompts}>
                another 1
            </div>
            <div className={styles.prompts}>
                :) 
            </div>
        </div>
        
    )
}