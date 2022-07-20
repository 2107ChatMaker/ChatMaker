//custom style
import styles from "./RateCard.module.sass";

// Creates a card for the rating page using a given prompt and response to generate it.
export default function RateCard({response, prompt, tags}) {
    return (
        <div className={styles.RateResponseOuterContainer}>
            <div className={styles.RateResponseInnerContainer}>
                <h2>{prompt}</h2>
                <div className={styles.RateResponseDeliniator}></div>
                <h3 className={styles.RateResponseResponse}>{`"${response}"`}</h3>
                <div className={styles.RateResponseTagsContainer}>
                    <h3 className={styles.RateResponseTagsTitle}>Tags:</h3>
                    <div className={styles.RateResponseTagList}>
                        {
                        tags.map((tag: string) => {
                            return (
                                <div key={tag}>
                                    <div className={styles.RateResponseTagContainer}>
                                        <h3 >{tag}</h3>
                                    </div>
                                </div>
                            );
                        })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
