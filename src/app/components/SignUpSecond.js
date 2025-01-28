import React, { useState } from 'react'
import signInStyle from './css/signinform.module.css';
import signUpStyle from './css/signupform.module.css';
import styles from './css/signupsecond.module.css';
import Image from 'next/image';
import xlogo from '../../../public/images/xlogo.png';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import buttonStyle from './css/button.module.css';

export default function SignUpSecond() {

    const [eyeOpen, setEyeOpen] = useState(true);
    const [password, setPassword] = useState("");

    return (
        <div className={`${signInStyle["form-container"]} ${signUpStyle["form-container"]}`}>
            <div className={signInStyle.image}>
                <Image src={xlogo} alt='xlogo' priority layout="intrinsic"/>
            </div>
            <div className={signUpStyle.title}>
                <h2>You'll need a password</h2>
                <p className={styles["password-info"]}>Make sures it's 8 characters or more.</p>
            </div>
            <form className={styles.form}>
                <div className={styles["input-box-container"]}>
                    <input className={styles.input} id='password' type={eyeOpen ? "password" : "text"} onChange={(e) => setPassword(e.target.value)} required></input>
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
                <div className={styles["info-text"]}>
                    <p>
                        By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, 
                        including <span>Cookie Use</span>. X may use your contact information, including your email 
                        address and phone number for purposes outlined in our Privacy Policy, like keeping 
                        your account secure and personalizing our services, including ads. <span>Learn more</span>
                        Others will be able to find you by email or phone number, when provided, unless 
                        you choose otherwise <span>here</span>.
                    </p>
                </div>
                <div>
                    <button className={`${buttonStyle.button} ${styles.button}`} disabled={password.length < 8}>Sign Up</button>
                </div>
            </form>
        </div>
    )
}
