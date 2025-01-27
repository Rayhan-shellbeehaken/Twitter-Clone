"use client"
import React from 'react'
import styles from './css/selectorinput.module.css';
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRef } from 'react';

export default function SelectorInput() {
    const selectRef = useRef(null);

    return (
        <div className={styles["selector-container"]}>
            <select id="month" className={styles.selector} ref={selectRef}>
                <option value="1">January</option>
                <option value="2">February</option>
            </select>
            <RiArrowDropDownLine className={styles["dropdown-icon"]}/>
            <label htmlFor='month' className={styles.label}>Month</label>
        </div>
    )
}
