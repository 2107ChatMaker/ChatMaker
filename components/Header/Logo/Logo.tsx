import Image from "next/image"
import styles from "./Logo.module.sass"
import {useRouter} from 'next/router'

export default function Logo() {

    //get router for redirecting to review page
    const router = useRouter()

    //redirect to review page function 
    const redirectToReview = () => {
        router.push('/')
    }

    return(
        <div className={styles.logo} onClick={redirectToReview}>
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