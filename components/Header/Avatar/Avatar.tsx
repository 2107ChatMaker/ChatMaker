import Image from "next/image";
import styles from "./Avatar.module.sass";
import {useRouter} from 'next/router';

//avatar component for displaying user image and redirect to profile page
export default function Avatar(props) {

    //get router for redirecting to profile page
    const router = useRouter();

    //redirect to profile page function
    const redirectToProfile = () => {
        router.push('/profile');
    }

    return (
        <div className={

                //check to see if custom styles are passed in, if not use default styles
                !props.style?styles.avatar:props.style
            } 

            //onclick for redirecting to profile page
            onClick={redirectToProfile}>

            <Image src={props.src} alt="avatar" width="100%" height="100%" layout="responsive"/>
        </div>
    )
}