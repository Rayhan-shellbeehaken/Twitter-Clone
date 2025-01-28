import React from 'react'
import styles from './css/inputbox.module.css';

export default function InputBox({label, margin}) {

    return (
        <div className={`${styles["input-box-container"]} ${margin !== undefined ? margin : ''}`}>
            <input className={`${styles.input}`} id='input'></input>
            <label className={styles.label} htmlFor='input'>{label}</label>
        </div>
    )
}
