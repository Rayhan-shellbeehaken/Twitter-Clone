import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import styles from './css/oauthsign.module.css';
import buttonStyle from './css/button.module.css';
import { doLogin } from '../helpers/authentication';

export default function OAuthSign() {
  return (
    <>
        <form action={doLogin} className={styles["oauth-form"]}>
            <button className={buttonStyle.button} name='action' value='google'>
              <FcGoogle />
              <p>Sign up with Google</p> 
            </button>

            <button className={buttonStyle.button} name='action' value='github'>
              <FaGithub />
              <p>Sign up with github</p>
            </button>
        </form>
    </>
  )
}
