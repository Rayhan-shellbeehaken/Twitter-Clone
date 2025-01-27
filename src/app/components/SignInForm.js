"use client"
import React from 'react'
import styles from './css/signinform.module.css';  
import { RxCross2 } from "react-icons/rx"; 
import { useAppContext } from '../store/store';
import SignFirstPhase from './SignFirstPhase';
import SignInSecondPhase from './SignInSecondPhase';

export default function SignInForm() {
    const {popUp, hidePopUp} = useAppContext();

    return (
        popUp && 
        <div className={styles.container}>
            <div className={styles.cross} onClick={hidePopUp}>
                <RxCross2 />
            </div>
            {/* <SignFirstPhase/> */}
            <SignInSecondPhase/>
        </div>
    )
}
