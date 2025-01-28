"use client"
import React, { useState } from 'react'
import signInStyle from './css/signinform.module.css';
import styles from './css/signupform.module.css';
import { RxCross2 } from "react-icons/rx"; 
import { useAppContext } from '../store/store';
import SignUpFirst from './SignUpFirst';
import SignUpSecond from './SignUpSecond';

export default function SignUpForm() {
    const {signUpPop, hideSignUp} = useAppContext();
    const [phaseComplete, setPhaseComplete] = useState(false);

    const onHide = () => {
        setPhaseComplete(false);
        hideSignUp();
    }

    return (
        signUpPop &&
        <div className={styles.container}>
            <div className={signInStyle.cross} onClick={onHide}>
                <RxCross2 />
            </div>
            {
                phaseComplete ? (
                    <SignUpSecond/>
                ) : (
                    <SignUpFirst setPhaseComplete={setPhaseComplete}/>
                )
            }
        </div>
    )
}
