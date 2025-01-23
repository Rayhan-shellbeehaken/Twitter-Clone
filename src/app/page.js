import React from 'react';

import { doLogin } from './helpers/authentication';

export default function Login() {

  return (
    <div>
      <form action={doLogin}>
        <input placeholder='Email' name='email'></input>
        <input placeholder='Password' name='password'></input>
        <button name='action' value='credentials'>Login</button>
        <button name='action' value='google'>Login with google</button>
        <button name='action' value='github'>Login with github</button>
      </form>
    </div>
  )
}
