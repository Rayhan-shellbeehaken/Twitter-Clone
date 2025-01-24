import React from 'react'
import styles from './css/divider.module.css';

export default function Divider({inForm}) {
  return (
    <div className={`${styles["divider-container"]} ${inForm ? styles.margin : ''}`}>
        <hr/>
        <span>or</span>
        <hr/>
    </div>
  )
}
