import styles from './Background.module.sass';
function Background({children}) {
    return (
        <div className={styles.background}>
            {children}
        </div>
    )
}

export default Background;