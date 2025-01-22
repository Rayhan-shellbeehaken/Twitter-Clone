"use client"
import React, { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const [username, setUserName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateofBirth, setDateofBirth] = useState("");
  const router = useRouter();

  const onSignUp = async() => {
    try{
      const res = await axios.post('/api/auth/signup',
        {
          username,
          email,
          password,
          dateofBirth
        }
      )
      router.push("/home");
    }catch(error){
      console.log("Error in signup page");
      console.log(error);
    }
  }

  const handleSubmit = async() => {
    const res = await signIn("credentials",{
      redirect : false,
      email,
      password
    });

    if(res.ok){
      router.push("/home");
    }else if(res.status === 400){
      console.log("Wrong credentials");
    }else{
      console.log("Hoi nai");
    }
  }

  const handleProvider = async(provider) => {
    await signIn(provider,{
      callbackUrl : "/home",
    });
  };

  return (
    <div>
      {/* <input placeholder='username' type='text' onChange={(e) => setUserName(e.target.value)}></input> */}
      <input placeholder='email' type='email' onChange={(e) => setEmail(e.target.value)}></input>
      <input placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)}></input>
      {/* <input placeholder='date of birth' type='date' onChange={(e) => setDateofBirth(e.target.value)}></input> */}
      <button onClick={handleSubmit}>Login</button>
      <button onClick={() => handleProvider("google")}>Login with google</button>
    </div>
  )
}
