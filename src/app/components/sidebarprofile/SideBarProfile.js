"use client"
import React, { useEffect } from 'react'
import styles from './sidebarprofile.module.css'
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import { RiMoreFill } from "react-icons/ri";
import SideBarPopUp from '../sidebarpopup/SideBarPopUp';
import { useState } from 'react';
import axios from 'axios';

export default function SideBarProfile({username}) {
    const [showPopUp, setShowPopUp] = useState(false);
    const [userInfo, setUserInfo] = useState({name : '' , profileImage : ''});

    useEffect(()=>{
        async function fetchData() {
            try{
                const user = await axios.get(`/api/user?username=${username}`);
                setUserInfo({name : user.data.user.username , profileImage : user.data.user.profileImage});
            }catch(error){
                console.log(error);
            }
        }
        fetchData();
    },[])

    return (
        <>
            {showPopUp && <SideBarPopUp/>} 
            <div className={styles.profile} onClick={() => setShowPopUp(!showPopUp)}>
                <div className={styles["profile-left"]}>
                    <div className={styles["profile-image"]}>
                        {userInfo.profileImage !== '' && 
                            <img src={userInfo.profileImage} alt='xlogo'></img>
                        }
                        
                    </div>
                    <div className={styles["profile-info"]}>
                        <h3>{userInfo.name || "username"}</h3>
                        <p>@_{userInfo.name || "account name"}</p>
                    </div>
                </div>
                
                <div className={styles["profile-more"]}>
                    <RiMoreFill/>
                </div>
            </div>
        </>
        
    )
}
