"use client"
import React, { useState } from 'react'
import signInStyle from './css/signinform.module.css';
import styles from './css/signupform.module.css';
import { RxCross2 } from "react-icons/rx"; 
import Image from 'next/image';
import xlogo from '../../../public/images/xlogo.png';
import inputBoxStyle from './css/inputbox.module.css'
import SelectorInput from './SelectorInput';
import width from './css/width.module.css';
import daysDeclaration from '../helpers/birthdate';
import buttonStyle from './css/button.module.css';
import { useAppContext } from '../store/store';
import SignUpFirst from './SignUpFirst';
import SignUpSecond from './SignUpSecond';

export default function SignUpForm() {
    const [dateofBirth, setDateofBirth] = useState({Month : '', Day : '', Year : ''});
    const {signUpPop, hideSignUp} = useAppContext();
    const [phaseComplete, setPhaseComplete] = useState(false);

    const handleChange = (type, event) => {
        console.log(event.target.value);
        if(type === 'Month'){
            daysDeclaration(event.target.value,dateofBirth.Year);
        }else if(type === "Year"){
            daysDeclaration(dateofBirth.Month,event.target.value);
        }
        setDateofBirth((prevState) => ({
            ...prevState,
            [type] : event.target.value
        }))
    }

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
