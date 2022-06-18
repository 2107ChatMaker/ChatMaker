import styles from './Background.module.sass';

interface BackgroundProps {
    children: React.ReactNode;
}

function Background(props: BackgroundProps) {
    return (
        <div className={styles.background}>
            {props.children}
        </div>
    )
}

export default Background;