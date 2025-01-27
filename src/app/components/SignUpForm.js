import React from 'react'
import signInStyle from './css/signinform.module.css';
import styles from './css/signupform.module.css';
import { RxCross2 } from "react-icons/rx"; 
import Image from 'next/image';
import xlogo from '../../../public/images/xlogo.png';
import InputBox from './InputBox';
import inputBoxStyle from './css/inputbox.module.css'
import SelectorInput from './SelectorInput';

export default function SignUpForm() {

    return (
        <div className={signInStyle.container}>
            <div className={signInStyle.cross} >
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
                        <div>
                            <SelectorInput/>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    )
}
