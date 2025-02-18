"use client"
import React, { useState } from 'react'
import styles from './popup.module.css'; 
import { useAppContext } from '@/app/store/store';

export default function Popup() {
    const types = {
        SUCCESS : 'success',
        ERROR : 'error'
    }
    const { alertVisible } = useAppContext();

    return (
        (alertVisible.visible) &&
        <div className={`${styles["popup-container"]} ${alertVisible.type === types.ERROR ? styles.error : ''} ${alertVisible.type === types.SUCCESS ? styles.success : ''}`}>
            <div className={styles.message}>
                {alertVisible.message}
            </div>
        </div>
    )
}
