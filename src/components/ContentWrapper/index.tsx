//react import
import { ReactNode } from 'react';

//custom sass file
import styles from './ContentWrapper.module.sass';


export default function ContentWrapper({children}: {children: ReactNode}) {
    return(
        <div className={styles.contentWrapper}>
            {children}
        </div>
    );
}