"use client"
import React, { useContext, useState } from 'react'
import { createContext } from 'react';

const AppContext = createContext();

export default function AppWrapper({ children }) {
    const [popUp, setPopUp] = useState(false);

    const showPopUp = () => {
        setPopUp(true);
    }
    const hidePopUp = () => {
        setPopUp(false);
    }

    const store = {popUp, showPopUp, hidePopUp};

    return (
        <AppContext.Provider value={store}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext(){
    return useContext(AppContext);
}
