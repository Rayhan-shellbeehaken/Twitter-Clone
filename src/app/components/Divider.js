import React from 'react'
import styles from './css/divider.module.css';

export default function Divider() {
  return (
    <div className={styles["divider-container"]}>
        <hr/>
        <span>or</span>
        <hr/>
    </div>
  )
}
