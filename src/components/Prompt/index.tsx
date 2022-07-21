//custom style
import styles from './Prompt.module.sass';


export default function Prompt({prompt, onClick}: {prompt: string, onClick: () => void}) {
    return(
        <div className={styles.prompts} onClick={onClick}>
            {prompt}
        </div>
    );
}