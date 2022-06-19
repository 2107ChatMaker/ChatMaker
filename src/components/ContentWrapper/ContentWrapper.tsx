import styles from './ContentWrapper.module.sass';
import { ReactNode } from 'react';

export default function ContentWrapper({children}: {children: ReactNode}) {
    return(
        <div className={styles.contentWrapper}>
            {children}
        </div>
    );
}