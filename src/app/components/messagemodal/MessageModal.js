"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from './messagemodal.module.css'
import { useAppContext } from '@/app/store/store';
import { FiX } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import axios from 'axios';

export default function MessageModal({username}) {
    const {messageModal, setMessageModal} = useAppContext();
    const [followings, setFollowings] = useState([]);

    useEffect(()=>{
        async function fetchFollowings() {
            try{
                const result = await axios.get(`/api/user?username=${username}`);
                const followings = result.data.user.following;
                setFollowings(followings);
                // console.log(result);
            }catch(error){
                console.log(error);
            }
        }
        fetchFollowings();
    },[]);

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
                {
                    followings.map(following => (
                        <div key={following._id} className={styles.user}>
                            <div className={styles.image}>
                                <img src={following.profileImage}></img>
                            </div>
                            <div className={styles.info}>
                                <h3>{following.username}</h3>
                                <p>@_{following.username}</p>
                                <div>
                                    <FaUser/> <p>Following</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
    )
}
