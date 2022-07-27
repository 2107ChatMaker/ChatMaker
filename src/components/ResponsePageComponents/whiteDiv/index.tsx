//react import
import { ReactNode } from 'react';

//custom style
import styles from './WhiteDiv.module.sass';


interface Props {
    size?: string,
    children?: ReactNode
};

export default function WhiteDiv(props: Props) {
    
    //if we want a longer div
    if (props.size == "big") {
        return(
            <div className={styles.whiteDiv}>
                <div className={styles.whiteDivContent}>{props.children}</div>
            </div>
        );
    }

    //if we want a smaller div
    else {
        return(
            <div className={styles.smallWhiteDiv}>
                <div className={styles.whiteDivContent}>{props.children}</div>
            </div>
        );
    };
};
