import React from 'react'
import styles from './css/credentialsign.module.css';
import buttonStyle from './css/button.module.css';

export default function CredentialSign() {
  return (
    <div className={styles["credentials-signin"]}>
        <h2>Already have an account?</h2>
        <form>
            <button className={buttonStyle.button}>Sign in</button>
        </form>
    </div>
  )
}
