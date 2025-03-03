"use client"
import React from 'react'
import { useState } from 'react';
import styles from './messagemodal.module.css'
import { useAppContext } from '@/app/store/store';
import { FiX } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

export default function MessageModal() {
    const {messageModal, setMessageModal} = useAppContext();
    return (
        messageModal && 
        <div className={styles.modal}>
            <div className={styles.box}>
                <div className={styles.head}>
                    <div>
                        <div onClick={()=>setMessageModal(false)}><FiX/></div>
                        <div>New Message</div>
                    </div>
                    <div>
                        Next
                    </div>
                </div>
                <div className={styles.searcbox}>
                    <IoSearch/>
                    <input placeholder='Search people'></input>
                </div>
                <hr/>
                <div className={styles.group}>
                    <div>
                        <FaUsers/>
                    </div>
                    Create a group
                </div>
                <hr/>
                <div className={styles.user}>
                    <div className={styles.image}>
                        
                    </div>
                    <div className={styles.info}>
                        <h3>User name</h3>
                        <p>Account name</p>
                        <div>
                            <FaUser/> <p>Following</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
