//react imports
import { ReactNode } from 'react';

//custom style
import styles from './PageTitle.module.sass';

interface Props {
    children?: ReactNode;
    title: string;
}

export default function PageTitle(props: Props) {
    return (
        <div className={`${styles.pageTitle} ${props.children? styles.isMobileTitle: ""}`}>
            <h1 className={styles.title}>{props.title}</h1>
            { props.children && 
                <div className={styles.mobileMenu}>
                    {props.children}
                </div>
            }
        </div>
    );

}