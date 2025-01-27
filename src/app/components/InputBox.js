import React from 'react'
import styles from './css/inputbox.module.css';

export default function InputBox() {

    return (
        <div className={styles["input-box-container"]}>
            <input className={styles.input} id='email'></input>
            <label className={styles.label} htmlFor='email'>email or username</label>
        </div>
    )
}
