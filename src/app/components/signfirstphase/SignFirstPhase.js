"use client";
import React, { useState } from "react";
import Image from "next/image";
import xlogo from "../../../../public/images/xlogo.png";
import styles from "../signinform/signinform.module.css";
import OAuthSign from "@/app/components/oauthsign/OAuthSign";
import Divider from "@/app/components/divider/Divider";
import InputBox from "@/app/components/inputbox/InputBox";
import buttonStyle from "@/app/components/css/button.module.css";
import { useAppContext } from "@/app/store/store";

export default function SignFirstPhase({ setPhaseComplete }) {
  const { userSign, setUserSign, hidePopUp, showSignUp } = useAppContext();

  const onChange = (type, value) => {
    setUserSign((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const clickedNext = (event) => {
    event.preventDefault();
    setPhaseComplete(true);
  };

  const toSignUp = () => {
    hidePopUp();
    showSignUp();
  };

  return (
    <div className={styles["form-container"]}>
      <div className={styles.image}>
        <Image src={xlogo} alt="xlogo" priority layout="intrinsic" />
      </div>
      <div className={styles.title}>
        <h2>Sign in to X</h2>
      </div>
      <OAuthSign inForm={true} />
      <Divider inForm={true} />
      <InputBox label="Email" onChange={onChange} />
      <form className={styles["button-form"]}>
        <button
          className={buttonStyle.button}
          onClick={clickedNext}
          disabled={userSign.Email === ""}
        >
          Next
        </button>
        <button
          className={`${buttonStyle.button} ${styles["forget-password"]}`}
        >
          Forgot password?
        </button>
      </form>
      <div className={styles["sign-up-message"]}>
        <p>
          Don't have an account? <span onClick={toSignUp}>Sign up</span>
        </p>
      </div>
    </div>
  );
}
