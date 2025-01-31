import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import styles from './oauthsign.module.css';
import buttonStyle from '@/app/components/css/button.module.css';
import { doLogin } from '@/app/helpers/authentication';

export default function OAuthSign({inForm}) {

  return (
    <>
        <form action={doLogin} className={styles["oauth-form"]}>
            <button className={`${buttonStyle.button} ${inForm ? buttonStyle.margin : ''}`} name='action' value='google'>
              <FcGoogle />
              <p>
                {inForm ? 'Sign in with Google' : 'Sign up with Google'}
              </p>
            </button>

            <button className={buttonStyle.button} name='action' value='github'>
              <FaGithub />
              <p>
                {inForm ? 'Sign in with Github' : 'Sign up with Github'}
              </p>
            </button>
        </form>
    </>
  )
}
