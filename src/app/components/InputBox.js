import React from 'react'
import styles from './css/inputbox.module.css';

export default function InputBox() {

    return (
        <div className={styles["input-box-container"]}>
            {/* <label className={styles.label}>E-mail</label> */}
            <input className={styles.input} placeholder='Email'></input>
        </div>
    )
}
