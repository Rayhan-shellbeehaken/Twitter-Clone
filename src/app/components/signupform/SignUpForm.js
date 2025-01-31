"use client"
import React, { useState } from 'react'
import signInStyle from '@/app/components/signinform/signinform.module.css';
import styles from './signupform.module.css';
import { RxCross2 } from "react-icons/rx"; 
import { useAppContext } from '@/app/store/store';
import SignUpFirst from '@/app/components/signupfirst/SignUpFirst';
import SignUpSecond from '@/app/components/signupsecond/SignUpSecond';

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
