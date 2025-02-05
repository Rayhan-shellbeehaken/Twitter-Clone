"use client";
import React from "react";
import Image from "next/image";
import xprofile from "../../public/images/xprofile.png"
import styles from "@/app/page.module.css";
import Divider from "@/app/components/divider/Divider";
import { Geologica } from "next/font/google";
import OAuthSign from "@/app/components/oauthsign/OAuthSign";
import SignUp from "@/app/components/signup/SignUp";
import CredentialSign from "@/app/components/credentialsign/CredentialSign";
import Footer from "@/app/components/footer/Footer";
import SignInForm from "@/app/components/signinform/SignInForm";
import SignUpForm from "@/app/components/signupform/SignUpForm";
import { useAppContext } from "@/app/store/store";
import Popup from "@/app/components/popup/Popup";

const geologica = Geologica({
  subsets: ["latin"],
  weight: ["100", "200", "600"],
});

export default function Login() {
  const { popUp, signUpPop } = useAppContext();

  return (
    <div
      className={`${styles.page} ${geologica.className} ${
        popUp || signUpPop ? styles["background-color"] : ""
      }`}
    >
      <SignInForm />
      <SignUpForm />
      <Popup />
      <div className={styles.container}>
        <div className={styles.image}>
          <Image src={xprofile} alt="xlogo" priority layout="intrinsic" />
        </div>
        <div className={styles["right-container"]}>
          <div className={styles.title}>
            <h1>Happening now</h1>
            <h3>Join today.</h3>
          </div>

          <OAuthSign />
          <Divider />
          <SignUp />
          <p className={styles["terms-condition"]}>
            By signing up, you agree to the <span>Terms of Service</span> and{" "}
            <span>Privacy Policy</span>, including <span>Cookie Use.</span>
          </p>
          <CredentialSign />
        </div>
      </div>
      {!popUp && !signUpPop && <Footer />}
    </div>
  );
}
