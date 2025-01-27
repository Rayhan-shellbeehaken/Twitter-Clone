import React from 'react'
import styles from './css/inputbox.module.css';

export default function InputBox({label, margin}) {

    return (
        <div className={styles["input-box-container"]}>
            <input className={`${styles.input} ${margin !== undefined ? margin : ''}`} id='email'></input>
            <label className={styles.label} htmlFor='email'>{label}</label>
        </div>
    )
}
