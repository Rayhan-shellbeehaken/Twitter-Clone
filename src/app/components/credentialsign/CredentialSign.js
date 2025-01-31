"use client"
import React from 'react'
import styles from './credentialsign.module.css';
import buttonStyle from '@/app/components/css/button.module.css';
import { useAppContext } from '@/app/store/store';

export default function CredentialSign() {
  const { showPopUp } = useAppContext();

  return (
    <div className={styles["credentials-signin"]}>
        <h2>Already have an account?</h2>
        <button className={`${buttonStyle.button} ${styles.hover}`} onClick={showPopUp}>Sign in</button>
    </div>
  )
}
