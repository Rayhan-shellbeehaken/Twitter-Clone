"use client"
import React from 'react'
import styles from './selectorinput.module.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import { Months, Days, Years } from '@/app/helpers/birthdate';

export default function SelectorInput({value, width, label, onChange}) {
    let options;
    if(label === "Month") options = Months;
    else if(label === "Day") options = Days;
    else if(label === "Year") options = Years;
    return (
        <div className={`${styles["selector-container"]} ${width}`}>
            <select value={value || ''} id="select" name={label} className={styles.selector} onChange={onChange} required>
                { label === "Month" ?
                    options.map((option) => (
                        <option key={option.name} value={option.name}>{option.name}</option>
                    )) :
                    options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))
                }
            </select>
            <RiArrowDropDownLine className={styles["dropdown-icon"]}/>
            <label htmlFor='select' className={styles.label}>{label}</label>
        </div>
    )
}
