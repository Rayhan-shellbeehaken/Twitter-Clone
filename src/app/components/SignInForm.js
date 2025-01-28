"use client"
import React, { useState } from 'react'
import styles from './css/signinform.module.css';  
import { RxCross2 } from "react-icons/rx"; 
import { useAppContext } from '../store/store';
import SignFirstPhase from './SignFirstPhase';
import SignInSecondPhase from './SignInSecondPhase';

export default function SignInForm() {
    const {popUp, hidePopUp} = useAppContext();
    const [phaseComplete, setPhaseComplete] = useState(false);

    const minimize = () => {
        setPhaseComplete(false);
        hidePopUp();
    }

    return (
        popUp && 
        <div className={`${styles.container} ${phaseComplete ? '' : styles["extra-padding"]}`}>
            <div className={styles.cross} onClick={minimize}>
                <RxCross2 />
            </div>
            {
                phaseComplete ? (
                    <SignInSecondPhase/>
                ) : (
                    <SignFirstPhase setPhaseComplete={setPhaseComplete}/>
                )
            }
        </div>
    )
}
