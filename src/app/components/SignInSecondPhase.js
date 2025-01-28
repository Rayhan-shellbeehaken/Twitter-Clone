import React from 'react'
import styles from './css/signinsecondphase.module.css';
import Image from 'next/image';
import xlogo from '../../../public/images/xlogo.png';
import InputBox from './InputBox';
import margin from './css/margin.module.css';
import width from './css/width.module.css';
import buttonStyle from './css/button.module.css';

export default function SignInSecondPhase() {

    return (
        <div className={styles["form-container"]}>
            <div className={styles.image}>
                <Image src={xlogo} alt='xlogo' priority layout="intrinsic"/>
            </div>
            <div className={styles.title}>
                <h2>Enter your password</h2>
            </div>
            <form className={width["width-full"]}>
                <InputBox label="Email" margin={margin["margin-30"]}/>
                <InputBox label="Password"/>
                <div className={styles["forget-password"]}>
                    <p>Forgot password?</p>
                </div>
                <button className={`${buttonStyle.button} ${styles["login-button"]}`}>Login</button>
            </form>
            <div className={styles["signup-text"]}>
                <p>Don't have an account? <span>Sign up</span></p>
            </div>
        </div>
    )
}
