import styles from './ContentCard.module.sass';



export default function ContentCard({test},  vars: [any]) {
    return (
        {//loop through tabs and display them
            vars.map(tab => (
                <div 
                className={`${styles.navItem} ${tab.tabActive ? styles.navItemActive : ''}`}
                key={tab.tabName} 
                onClick={}>
                    {tab.tabName}
                </div>
                // <div className={styles.CardContainer} >
                // {test()}
                // </div>
            ))}
        
    )
}