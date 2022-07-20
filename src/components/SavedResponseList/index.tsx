//component
import SavedResponse from './SavedResponse';
//custom style
import styles from './SavedResponseList.module.sass';

export default function SavedResponseList({prompt, title, onSelect}) {
    return (
        <div className={styles.prompt}>
            <h2 className={styles.promptTitle}>{title}</h2>
            <hr/>
            <div className={styles.response}>
                {prompt.map((response, index) => (
                    <SavedResponse key={index} response={response} onSelect={onSelect}/>
                ))}
            </div>
        </div>
    );
}