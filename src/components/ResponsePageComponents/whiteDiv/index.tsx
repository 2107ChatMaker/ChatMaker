//react import
import { ReactNode } from 'react';
//custom style
import styles from './WhiteDiv.module.sass';


interface Props {
    size?: string,
    children?: ReactNode
};

export default function WhiteDiv(props: Props) {
    return(
        <div className={styles.whiteDiv}>
            <div className={styles.whiteDivContent}>{props.children}</div>
        </div>
    );
};
