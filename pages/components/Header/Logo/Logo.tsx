import Image from "next/image"
import styles from "./Logo.module.sass"
export default function Logo() {
    return(
        <div className={styles.logo}>
            <Image 
            src="/resources/Logo.svg" 
            alt="logo"
            width="100%"
            height="100%" 
            layout='responsive'
            />
        </div>
    )
}