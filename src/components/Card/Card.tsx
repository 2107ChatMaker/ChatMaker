import { ReactNode } from "react";
import styles from './Card.module.sass';

interface Props {
    variant?: "dark" | "light",
    children?: ReactNode,
    isDraggable?: boolean,
}

export default function Card({children, variant, isDraggable}: Props) {
    return (
        <div className={`${styles.card} ${styles[variant]}`}>
            {children}
        </div>
    );
}