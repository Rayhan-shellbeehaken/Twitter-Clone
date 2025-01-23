import React from 'react'
import buttonStyle from './css/button.module.css';
import styles from './css/signup.module.css';
export default function SignUp() {
  return (
    <>
        <form className={styles["signup-form"]}>
            <button className={buttonStyle.button}>Create account</button>
        </form>
    </>
  )
}
