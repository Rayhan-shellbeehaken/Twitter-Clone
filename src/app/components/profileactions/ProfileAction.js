import React from 'react'
import styles from './profileaction.module.css';
import { RiMoreFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import { FiMail } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";

export default function ProfileAction() {
    return ( 
        <div className={styles.container}>
            <button className={`${styles.circle} ${styles.hide}`}><RiMoreFill/></button>
            <button className={`${styles.circle} ${styles.hide}`}><VscVscode/></button>
            <button className={`${styles.circle} ${styles.hide}`}><IoSearch/></button>
            <button className={`${styles.circle} ${styles.hide}`}><FiMail/></button>
            <button className={`${styles.button} ${styles.hide}`}>Follow</button>
            <button className={styles.button}>Edit profile</button>
        </div>
    )
}
