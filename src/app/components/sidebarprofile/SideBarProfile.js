"use client"
import React from 'react'
import styles from './sidebarprofile.module.css'
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import { RiMoreFill } from "react-icons/ri";
import SideBarPopUp from '../sidebarpopup/SideBarPopUp';
import { useState } from 'react';

export default function SideBarProfile() {
    const [showPopUp, setShowPopUp] = useState(false);
    return (
        <>
            {showPopUp && <SideBarPopUp/>} 
            <div className={styles.profile} onClick={() => setShowPopUp(!showPopUp)}>
                <div className={styles["profile-left"]}>
                    <div className={styles["profile-image"]}>
                        <Image src={xlogo} alt='xlogo' priority layout='intrinsic'></Image>
                    </div>
                    <div className={styles["profile-info"]}>
                        <h3>Rayhan</h3>
                        <p>@_Rayhan66</p>
                    </div>
                </div>
                
                <div className={styles["profile-more"]}>
                    <RiMoreFill/>
                </div>
            </div>
        </>
        
    )
}
