import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import styles from './css/oauthsign.module.css';
import buttonStyle from './css/button.module.css';

export default function OAuthSign() {
  return (
    <>
        <form className={styles["oauth-form"]}>
            <button className={buttonStyle.button}>
              <FcGoogle />
              <p>Sign up with Google</p> 
            </button>

            <button className={buttonStyle.button}>
              <FaGithub />
              <p>Sign up with github</p>
            </button>
        </form>
    </>
  )
}
