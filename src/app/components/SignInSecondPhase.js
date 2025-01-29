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
import { doCredentialLogin } from '../helpers/authentication';
import { useRouter } from 'next/navigation';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';

export default function SignInSecondPhase() {

    const {userSign, setUserSign, toggleAlert, hidePopUp} = useAppContext();
    const [eyeOpen, setEyeOpen] = useState(true);
    const router = useRouter();

    async function onSubmit(event) {
        event.preventDefault();
        try{
            const formData = new FormData(event.currentTarget);

            const response = await doCredentialLogin(formData);
            toggleAlert('success', 'Success to login');
            setTimeout(() => {
                hidePopUp();
                router.push('/home');
            },1000);

        }catch(error){
            console.log("Error");
            console.log(error);
            toggleAlert('error', 'Failed to login');
        }
    }

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
            <form onSubmit={onSubmit} className={width["width-full"]}>
                <InputBox label="Email" margin={margin["margin-30"]} value={userSign.Email} disabled={true}/>
                
                <div className={styles["input-box-container"]}>
                    <input className={styles.input} name="Password" id='password' type={eyeOpen ? "password" : "text"} onChange={(e) => onChange("Password", e.target.value)} required></input>
                    <label className={styles.label} htmlFor='password'>Password</label>
                    <div className={styles.eye} onClick={() => setEyeOpen(!eyeOpen)}>
                        {
                            eyeOpen ? (
                                <FaEye/>
                            ) : (
                                <FaEyeSlash/>
                            )
                        }
                    </div>
                </div>
                <div className={styles["forget-password"]}>
                    <p>Forgot password?</p>
                </div>
                <button type='submit' className={`${buttonStyle.button} ${styles["login-button"]}`} disabled={userSign.Password === ''} name='action' value='credentials'>Login</button>
            </form>
            <div className={styles["signup-text"]}>
                <p>Don't have an account? <span>Sign up</span></p>
            </div>
        </div>
    )
}
