"use client"
import React, { useContext, useState } from 'react'
import { createContext } from 'react';

const AppContext = createContext();

export default function AppWrapper({ children }) {
    const [popUp, setPopUp] = useState(false);
    const [signUpPop, setSignUpPop] = useState(false);
    const [userSign, setUserSign] = useState({Email : '', Password : ''});

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
        userSign, setUserSign
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
