import styles from './Prompt.module.sass';

export default function Prompt({prompt}: {prompt: string}) {
    return(
        <div className={styles.prompts}>
            {prompt}
        </div>
    );
}