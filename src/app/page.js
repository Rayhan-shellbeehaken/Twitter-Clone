import React from 'react';
import Image from 'next/image';
import xlogo from '../../public/images/xlogo.png';
import styles from '@/app/page.module.css';
import Divider from './components/Divider';
import { Geologica } from 'next/font/google';
import OAuthSign from './components/OAuthSign';
import SignUp from './components/SignUp';
import CredentialSign from './components/CredentialSign';
import Footer from './components/Footer';

const geologica = Geologica({subsets : ["latin"], weight : ["100", "200", "600"]});

export default function Login() {

  return (
    <div className={`${styles.page} ${geologica.className}`}>

      <div className={styles["main-section"]}>
        <div className={styles["logo-container"]}>
          <Image src={xlogo} alt='xlogo' priority layout="intrinsic"/>
        </div>
        <div className={styles.title}>
          <h1>Happening now</h1>
          <h3>Join today.</h3>
        </div>
        <div className={styles["action-container"]}>
          <OAuthSign/>
          <Divider/>
          <SignUp/>
          <p className={styles["terms-condition"]}>By signing up, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, including <span>Cookie Use.</span></p>
          <CredentialSign/>  
        </div>    
      </div>

      <Footer/>
    </div>
  )
}
