"use client"
import React, { useContext, useState } from 'react'
import { createContext } from 'react';

const AppContext = createContext();

export default function AppWrapper({ children }) {
    const [popUp, setPopUp] = useState(false);
    const [signUpPop, setSignUpPop] = useState(false);
    const [userSign, setUserSign] = useState({Email : '', Password : ''});
    const [alertVisible, setAlertVisible] = useState({visible : false, type : '', message : ''});
    const [userSignUp, setUserSignUp] = useState({name : '', email : '', password : '', dateofbirth : ''});

    const toggleAlert = (type, message) => {
        setAlertVisible({visible : true, type : type, message : message});
        setTimeout(()=>{
            setAlertVisible({visible : false, type : '', message : ''});
        },1000);
    }

    const showPopUp = () => {
        setPopUp(true);
    }
    const hidePopUp = () => {
        setPopUp(false);
    }

    const showSignUp = () => {
        setSignUpPop(true);
    }
    const hideSignUp = () => {
        setSignUpPop(false);
    }

    const store = {
        popUp, showPopUp, hidePopUp,
        signUpPop, showSignUp, hideSignUp,
        userSign, setUserSign,
        alertVisible, toggleAlert,
        userSignUp, setUserSignUp
    };

    return (
        <AppContext.Provider value={store}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext);
}
