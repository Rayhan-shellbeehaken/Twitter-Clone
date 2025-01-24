import React from 'react'
import Image from 'next/image';
import xlogo from '../../../public/images/xlogo.png';
import styles from './css/signinform.module.css';  
import { RxCross2 } from "react-icons/rx"; 
import OAuthSign from './OAuthSign';
import Divider from './Divider';
import InputBox from './InputBox';

export default function SignInForm() {
  return (
    <div className={styles.container}>
        <div className={styles.cross}>
            <RxCross2 />
        </div>
        <div className={styles["form-container"]}>
            <div className={styles.image}>
                <Image src={xlogo} alt='xlogo' priority layout="intrinsic"/>
            </div>
            <div className={styles.title}>
                <h2>Sign in to X</h2>
            </div>
            <OAuthSign inForm={true}/>
            <Divider inForm={true}/>
            <InputBox/>
        </div>
    </div>
  )
}
