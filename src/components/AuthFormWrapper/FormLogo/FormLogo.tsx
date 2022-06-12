import styles from './FormLogo.module.sass';
import Image from 'next/image';

export default function FormLogo() {
    return (
        <div className={styles.formLogo}>
            <div className={styles.logo}>
                <Image 
                    width={"100%"} 
                    height={"100%"} 
                    src={"/resources/Logo.svg"} 
                    alt={"Logo"} 
                    layout={"responsive"}
                />
            </div>
            <p className={styles.logoText}>
                ChatWriter
            </p>
        </div>
        )
}