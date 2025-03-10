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
import Loader from '../loader/Loader';
import { useRouter } from 'next/navigation';
import { getUserInfo } from '@/app/actions/useraction';

export default function MessageModal({username}) {
    const {messageModal, setMessageModal} = useAppContext();
    const [followings, setFollowings] = useState([]);
    const [loading,setLoading] = useState(true);
    const [chooseUser, setChooseUser] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        if(!username) return;
        async function fetchFollowings() {
            try{
                const result = await getUserInfo(username);
                const followings = result.user.following;
                console.log(followings);
                setFollowings(followings);
                setLoading(false);
                // console.log(result);
            }catch(error){
                console.log(error);
            }
        }
        fetchFollowings();
    },[]);

    const addUser = (image, name, id) =>{
        setChooseUser((prevUsers) => {
            const exists = prevUsers.some(user => user.image === image && user.name === name && user.id === id);
            if (exists) {
                return prevUsers.filter(user => user.image !== image || user.name !== name || user.id !== id);
            } else {
                return [...prevUsers, { image, name, id }];
            }
        });
    }

    const sendMessage = (id) =>{
        router.push(`/messages/${id}`);
        setMessageModal(false);
        setChooseUser([]);
    }

    return (
        messageModal && 
        <div className={styles.modal}>
            <div className={styles.box}>
                <div className={styles.head}>
                    <div>
                        <div onClick={()=>setMessageModal(false)}><FiX/></div>
                        <div>New Message</div>
                    </div>
                    <div onClick={()=>sendMessage(chooseUser[0].id)}>
                        Next
                    </div>
                </div>
                <div className={styles.searcbox}>
                    <IoSearch/>
                    <input placeholder='Search people'></input>
                </div>
                <hr/>
                <div className={`${styles.group} ${chooseUser.length === 0 ? styles["cursor-pointer"] : ''}`}>
                    
                    {chooseUser.length !== 0 ? (
                        chooseUser.map((user)=>(
                            <div key={user.name} onClick={()=>addUser(user.image,user.name,user.id)} className={styles["choose-user"]}>
                                <div className={styles.userImage}>
                                    <img src={user.image} alt=''></img>
                                </div>
                                <div className={styles["choose-user-name"]}>
                                    <p>{user.name}</p>    
                                    <p><FiX/></p>
                                </div>
                            </div>
                        ))): 
                        <>
                            <div className={styles["user-icon"]}><FaUsers/></div>
                            Create a group
                        </>
                    }

                </div>
                <hr/>
                {
                    loading && <Loader/>
                }
                {
                    followings.map(following => (
                        <div onClick={() => addUser(following.profileImage, following.username, following._id)} key={following._id} className={styles.user}>
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
