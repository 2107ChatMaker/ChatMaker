import Image from "next/image";
import styles from "./Avatar.module.sass";

export default function Avatar(props) {
    return (
        <div className={!props.style?styles.avatar:props.style} onClick={props.onClick}>
            <Image src={props.src} alt="avatar" width="100%" height="100%" layout="responsive"/>
        </div>
    )
}