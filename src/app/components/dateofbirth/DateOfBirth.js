"use client"
import React from 'react'
import SelectorInput from '@/app/components/selectorinput/SelectorInput';
import width from '@/app/components/css/width.module.css';
import { useState } from 'react';
import daysDeclaration from '@/app/helpers/birthdate';
import styles from './dateofbirth.module.css';

export default function DateOfBirth() {
    const [dateofBirth, setDateofBirth] = useState({Month : '', Day : '', Year : ''});

    const handleChange = (type, event) => {
        console.log(event.target.value);
        if(type === 'Month'){
            daysDeclaration(event.target.value,dateofBirth.Year);
        }else if(type === "Year"){
            daysDeclaration(dateofBirth.Month,event.target.value);
        }
        setDateofBirth((prevState) => ({
            ...prevState,
            [type] : event.target.value
        }))
    }

    return (
        <div className={styles["date-of-birth"]}>
            <SelectorInput width={width["width-220"]} label="Month" onChange={(e) => handleChange("Month",e)}/>
            <SelectorInput width={width["width-90"]} label="Day" onChange={(e) => handleChange("Day",e)}/>
            <SelectorInput width={width["width-150"]} label="Year" onChange={(e) => handleChange("Year",e)}/>
        </div>
    )
}
