"use client"
import React from 'react'
import styles from './profileaction.module.css';
import { RiMoreFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import { FiMail } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useAppContext } from '@/app/store/store';
import axios from 'axios';

export default function ProfileAction({ownProfile,ownId,userId}) {
    const {setProfileModal,toggleAlert} = useAppContext();

    const onFollow = async() => {
        const data = {
            newFollower : ownId
        }
        try{
            const result = await axios.patch(`/api/user?id=${userId}`,data);
            toggleAlert("success","Successfully followed");
        }catch(error){
            console.log(error);
            toggleAlert("error","Failed to follow")
        }
    }

    return ( 
        <div className={styles.container}>
            <button className={`${styles.circle} ${!ownProfile ? '' : styles.hide}`}><RiMoreFill/></button>
            <button className={`${styles.circle} ${!ownProfile ? '' : styles.hide}`}><VscVscode/></button>
            <button className={`${styles.circle} ${!ownProfile ? '' : styles.hide}`}><IoSearch/></button>
            <button className={`${styles.circle} ${!ownProfile ? '' : styles.hide}`}><FiMail/></button>
            <button className={`${styles.button} ${!ownProfile ? '' : styles.hide}`} onClick={onFollow}>Follow</button>
            <button className={`${styles.button} ${ownProfile ? '' : styles.hide}`} onClick={()=>setProfileModal(true)}>Edit profile</button>
        </div>
    )
}
