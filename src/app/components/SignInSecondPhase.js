"use client"
import React from 'react'
import styles from './css/signinsecondphase.module.css';
import Image from 'next/image';
import xlogo from '../../../public/images/xlogo.png';
import InputBox from './InputBox';
import margin from './css/margin.module.css';
import width from './css/width.module.css';
import buttonStyle from './css/button.module.css';
import { useAppContext } from '../store/store';
import { doLogin } from '../helpers/authentication';

export default function SignInSecondPhase() {

    const {userSign, setUserSign} = useAppContext();


    const onChange = (type, value) => {
        setUserSign((prev)=>({
            ...prev,
            [type] : value
        }))
    }

    return (
        <div className={styles["form-container"]}>
            <div className={styles.image}>
                <Image src={xlogo} alt='xlogo' priority layout="intrinsic"/>
            </div>
            <div className={styles.title}>
                <h2>Enter your password</h2>
            </div>
            <form action={doLogin} className={width["width-full"]}>
                <InputBox label="Email" margin={margin["margin-30"]} value={userSign.Email} disabled={true}/>
                <InputBox label="Password" onChange={onChange}/>
                <div className={styles["forget-password"]}>
                    <p>Forgot password?</p>
                </div>
                <button className={`${buttonStyle.button} ${styles["login-button"]}`} disabled={userSign.Password === ''} name='action' value='credentials'>Login</button>
            </form>
            <div className={styles["signup-text"]}>
                <p>Don't have an account? <span>Sign up</span></p>
            </div>
        </div>
    )
}
