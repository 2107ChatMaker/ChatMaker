//react import
import { useState } from 'react';

//material UI
import { Checkbox } from '@mui/material';

//custom style
import styles from './SavedResponse.module.sass';


export default function SavedResponse({response: {response: res, _id: id}, onSelect}) {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        onSelect(id, event.target.checked);
    };

    return (
        <div className={styles.response}>
            <div className={styles.content}>
                <div className={styles.responseContent}>
                    {res}
                </div>
                <div className={styles.checkBox}>
                    <Checkbox size='medium' sx={{ '& .MuiSvgIcon-root': { fontSize: "2rem" } }} checked={checked} onChange={handleChange}/>
                </div>
            </div>
            <hr className={styles.hr}/>
        </div>
    );
}