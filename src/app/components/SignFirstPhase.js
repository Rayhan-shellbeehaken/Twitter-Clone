"use client"
import React from 'react'
import Image from 'next/image';
import xlogo from '../../../public/images/xlogo.png';
import styles from './css/signinform.module.css';
import OAuthSign from './OAuthSign';
import Divider from './Divider';
import InputBox from './InputBox';
import buttonStyle from './css/button.module.css';

export default function SignFirstPhase({setPhaseComplete}) {

    const clickedNext = (event) => {
        event.preventDefault();
        setPhaseComplete(true);
    }

    return (
        <div className={styles["form-container"]}>
            <div className={styles.image}>
                <Image src={xlogo} alt='xlogo' priority layout="intrinsic"/>
            </div>
            <div className={styles.title}>
                <h2>Sign in to X</h2>
            </div>
            <OAuthSign inForm={true}/>
            <Divider inForm={true}/>
            <InputBox label="Email"/>
            <form className={styles["button-form"]}>
                <button className={buttonStyle.button} onClick={clickedNext}>Next</button>
                <button className={`${buttonStyle.button} ${styles["forget-password"]}`}>Forgot password?</button>
            </form>
            <div className={styles["sign-up-message"]}>
                <p>Don't have an account? <span>Sign up</span></p>
            </div>
        </div>
    )
}
