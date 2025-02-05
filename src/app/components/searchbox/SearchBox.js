import React from 'react'
import styles from './searchbox.module.css'
import { IoSearch } from "react-icons/io5";

export default function SearchBox() {
    return (
        <div className={styles.container}>
            <div className={styles["search-box"]}>
                <IoSearch className={styles.icon}/>
                <input placeholder='Search'></input>
            </div>
            
        </div>
    )
}
