import styles from './Background.module.sass';
import { ReactNode } from 'react';

//props type
interface BackgroundProps {
    children: ReactNode;
}

function Background(props: BackgroundProps) {
    return (
        <div className={styles.background}>
            {props.children}
        </div>
    );
}

export default Background;