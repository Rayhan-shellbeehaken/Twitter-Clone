"use client"
import React, { useState } from 'react'
import signInStyle from '@/app/components/signinform/signinform.module.css';
import styles from '@/app/components/signupform/signupform.module.css';
import Image from 'next/image';
import xlogo from '../../../../public/images/xlogo.png';
import inputBoxStyle from '@/app/components/inputbox/inputbox.module.css'
import SelectorInput from '@/app/components/selectorinput/SelectorInput';
import width from '@/app/components/css/width.module.css';
import daysDeclaration from '@/app/helpers/birthdate';
import buttonStyle from '@/app/components/css/button.module.css';
import { useAppContext } from '@/app/store/store';

export default function SignUpFirst({setPhaseComplete}) {
    const [dateofBirth, setDateofBirth] = useState({Month : '', Day : '', Year : ''});
    const { setUserSignUp } = useAppContext();

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username");
        const email = formData.get("email");
        const dateofbirth = dateofBirth.Month + " " + dateofBirth.Day + "," + dateofBirth.Year;

        setUserSignUp((prev) => ({
            ...prev,
            name : username,
            email : email,
            dateofbirth : dateofbirth
        }))

        if(username && email && dateofbirth.length >= 8){
            setPhaseComplete(true);
        }
    }

    const handleChange = (type, event) => {
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
        <div className={`${signInStyle["form-container"]} ${styles["form-container"]}`}>
            <div className={signInStyle.image}>
                <Image src={xlogo} alt='xlogo' priority layout="intrinsic"/>
            </div>
            <div className={styles.title}>
                <h2>Create your account</h2>
            </div>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={`${inputBoxStyle["input-box-container"]} ${styles["input-box"]}`}>
                    <input className={inputBoxStyle.input} name="username" id='name' type='text' required></input>
                    <label className={inputBoxStyle.label} htmlFor='name'>Name</label>
                </div>
                <div className={`${inputBoxStyle["input-box-container"]} ${styles["input-box"]}`}>
                    <input className={inputBoxStyle.input} name="email" id='email' type='text' required></input>
                    <label className={inputBoxStyle.label} htmlFor='email'>Email</label>
                </div>

                <div className={styles["date-of-birth-container"]}>
                    <h3>Date of birth</h3>
                    <p>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</p>
                    <div className={styles["date-of-birth"]}>
                        <SelectorInput value={dateofBirth.Month} width={width["width-200"]} label="Month" onChange={(e) => handleChange("Month",e)}/>
                        <SelectorInput value={dateofBirth.Day} width={width["width-85"]} label="Day" onChange={(e) => handleChange("Day",e)}/>
                        <SelectorInput value={dateofBirth.Year} width={width["width-150"]} label="Year" onChange={(e) => handleChange("Year",e)}/>
                    </div>
                </div>

                <button type='submit' className={`${buttonStyle.button} ${styles["next-button"]}`}>Next</button>
            </form>
            
        </div>
    )
}
