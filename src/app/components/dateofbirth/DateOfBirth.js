"use client"
import React, { useEffect } from 'react'
import SelectorInput from '@/app/components/selectorinput/SelectorInput';
import width from '@/app/components/css/width.module.css';
import { useState } from 'react';
import daysDeclaration from '@/app/helpers/birthdate';
import styles from './dateofbirth.module.css';
import { Months } from '@/app/helpers/birthdate';

export default function DateOfBirth({birth}) {
    const [dateofBirth, setDateofBirth] = useState({Month : '', Day : '', Year : ''});

    useEffect(()=>{
        if(birth){
            const [year, month, date] = birth.split("T")[0].split("-");
            const monthName = Months[parseInt(month,10)].name;
            setDateofBirth({Month : monthName, Year : year, Day : date});
        }
    },[birth]);

    const handleChange = (type, event) => {
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
            <SelectorInput value={dateofBirth.Month} width={width["width-220"]} label="Month" onChange={(e) => handleChange("Month",e)}/>
            <SelectorInput value={dateofBirth.Day} width={width["width-90"]} label="Day" onChange={(e) => handleChange("Day",e)}/>
            <SelectorInput value={dateofBirth.Year} width={width["width-150"]} label="Year" onChange={(e) => handleChange("Year",e)}/>
        </div>
    )
}
