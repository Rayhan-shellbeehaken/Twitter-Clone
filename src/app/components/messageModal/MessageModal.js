"use client"
import React from 'react'
import { useState } from 'react';
import styles from './messagemodal.module.css'
import { useAppContext } from '@/app/store/store';
import { FiX } from "react-icons/fi";

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
        </div>
    </div>
  )
}
