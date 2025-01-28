"use client"
import React from 'react'
import styles from './css/popup.module.css'; 
import { useAppContext } from '../store/store';

export default function Popup() {
    const types = {
        SUCCESS : 'success',
        ERROR : 'error'
    }

    const { alertVisible } = useAppContext();

    return (
        alertVisible.visible &&
        <div className={`${styles["popup-container"]} ${alertVisible.type === types.ERROR ? styles.error : ''} ${alertVisible.type === types.SUCCESS ? styles.success : ''}`}>
            <div className={styles.message}>
                {alertVisible.message}
            </div>
        </div>
    )
}
