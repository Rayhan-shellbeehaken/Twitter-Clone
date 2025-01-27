"use client"
import React from 'react'
import buttonStyle from './css/button.module.css';
import styles from './css/signup.module.css';
import { useAppContext } from '../store/store';

export default function SignUp() {
  const {showSignUp} = useAppContext();
  const show = (event) => {
    event.preventDefault();
    showSignUp();
  }
  return (
    <>
        <form className={styles["signup-form"]}>
            <button className={buttonStyle.button} onClick={show}>Create account</button>
        </form>
    </>
  )
}
