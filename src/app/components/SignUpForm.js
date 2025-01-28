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

export default function SignUpForm() {
    const [dateofBirth, setDateofBirth] = useState({Month : '', Day : '', Year : ''});
    const {signUpPop, hideSignUp} = useAppContext();

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

    return (
        signUpPop &&
        <div className={styles.container}>
            <div className={signInStyle.cross} onClick={hideSignUp}>
                <RxCross2 />
            </div>
            <div className={`${signInStyle["form-container"]} ${styles["form-container"]}`}>
                <div className={signInStyle.image}>
                    <Image src={xlogo} alt='xlogo' priority layout="intrinsic"/>
                </div>
                <div className={styles.title}>
                    <h2>Create your account</h2>
                </div>
                <form className={styles.form}>
                    <div className={`${inputBoxStyle["input-box-container"]} ${styles["input-box"]}`}>
                        <input className={inputBoxStyle.input} id='name'></input>
                        <label className={inputBoxStyle.label} htmlFor='name'>Name</label>
                    </div>
                    <div className={`${inputBoxStyle["input-box-container"]} ${styles["input-box"]}`}>
                        <input className={inputBoxStyle.input} id='email'></input>
                        <label className={inputBoxStyle.label} htmlFor='email'>Email</label>
                    </div>

                    <div className={styles["date-of-birth-container"]}>
                        <h3>Date of birth</h3>
                        <p>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                        <div className={styles["date-of-birth"]}>
                            <SelectorInput width={width["width-200"]} label="Month" onChange={(e) => handleChange("Month",e)}/>
                            <SelectorInput width={width["width-85"]} label="Day" onChange={(e) => handleChange("Date",e)}/>
                            <SelectorInput width={width["width-150"]} label="Year" onChange={(e) => handleChange("Year",e)}/>
                        </div>
                    </div>

                    <button className={`${buttonStyle.button} ${styles["next-button"]}`} disabled>Next</button>
                </form>
                
            </div>
        </div>
    )
}
