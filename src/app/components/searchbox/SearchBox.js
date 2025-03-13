"use client"
import React from 'react'
import styles from './searchbox.module.css'
import { IoSearch } from "react-icons/io5";


export default function SearchBox({ searchTerm, setSearchTerm }) {
    const isControlled = searchTerm !== undefined && setSearchTerm !== undefined;

    const handleChange = (e) => {
        if (isControlled && setSearchTerm) {
            setSearchTerm(e.target.value); // Update the state if controlled
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles["search-box"]}>
                <IoSearch className={styles.icon}/>
                <input 
                    placeholder='Search'
                    value={isControlled ? searchTerm : undefined}
                    onChange={isControlled ? handleChange : undefined}
                >

                </input>
            </div>
        </div>
    )
}
