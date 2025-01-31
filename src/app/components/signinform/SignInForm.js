"use client"
import React, { useState } from 'react'
import styles from './signinform.module.css';  
import { RxCross2 } from "react-icons/rx"; 
import { useAppContext } from '@/app/store/store';
import SignFirstPhase from '@/app/components/signfirstphase/SignFirstPhase';
import SignInSecondPhase from '@/app/components/signinsecondphase/SignInSecondPhase';

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
