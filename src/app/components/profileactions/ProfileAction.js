"use client"
import React from 'react'
import styles from './profileaction.module.css';
import { RiMoreFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import { FiMail } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { useAppContext } from '@/app/store/store';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function ProfileAction({ownProfile,ownId,userId,followed}) {
    const {setProfileModal,toggleAlert} = useAppContext();
    const router = useRouter();

    const onFollow = async() => {
        const data = {
            newFollower : ownId
        }
        try{
            const result = await axios.patch(`/api/user?id=${userId}&followed=${followed}`,data);
            const message = followed ? "Successfully unfollowed" : "Successfully followed";
            toggleAlert("success",message);
            router.refresh();
        }catch(error){
            console.log(error);
            const message = followed ? "Failed to unfollow" : "Failed to follow";
            toggleAlert("error",message);
        }
    }

    return ( 
        <div className={styles.container}>
            <button className={`${styles.circle} ${!ownProfile ? '' : styles.hide}`}><RiMoreFill/></button>
            <button className={`${styles.circle} ${!ownProfile ? '' : styles.hide}`}><VscVscode/></button>
            <button className={`${styles.circle} ${!ownProfile ? '' : styles.hide}`}><IoSearch/></button>
            <button className={`${styles.circle} ${!ownProfile ? '' : styles.hide}`}><FiMail/></button>
            <button className={`${styles.button} ${!ownProfile ? '' : styles.hide}`} onClick={onFollow}>
                {followed ? "Following" : "Follow"}
            </button>
            <button className={`${styles.button} ${ownProfile ? '' : styles.hide}`} onClick={()=>setProfileModal(true)}>Edit profile</button>
        </div>
    )
}
