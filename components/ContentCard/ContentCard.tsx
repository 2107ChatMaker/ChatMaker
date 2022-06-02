import styles from './ContentCard.module.sass';



export default function ContentCard({test}) {
    return (
        <div className={styles.CardContainer} >
            {test()}
        </div>
    )
}