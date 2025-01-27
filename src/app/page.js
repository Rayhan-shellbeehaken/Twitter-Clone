"use client"
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
import SignInForm from './components/SignInForm';
import { useAppContext } from './store/store';

const geologica = Geologica({subsets : ["latin"], weight : ["100", "200", "600"]});

export default function Login() {

  const { popUp } = useAppContext();

  return (
    <div className={`${styles.page} ${geologica.className} ${popUp ? styles["background-color"] : ''}`}>
      <SignInForm/>
      <div className={styles.container}>
          <div className={styles.image}>
            <Image src={xlogo} alt='xlogo' priority layout="intrinsic"/>
          </div>
          <div className={styles["right-container"]}>
            <div className={styles.title}>
              <h1>Happening now</h1>
              <h3>Join today.</h3>
            </div>

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
