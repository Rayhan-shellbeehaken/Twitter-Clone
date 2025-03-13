"use client"
import React, { useEffect, useState } from 'react'
import styles from './whotofollow.module.css'
import Image from 'next/image';
import xprofile from '../../../../public/images/xprofile.png'
import { addFollow, getUsers } from '@/app/actions/useraction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function WhoToFollow() {
    const [users, setUsers] = useState([]);
    const {data:session, status} = useSession(); 
    const router = useRouter();

    async function fetchUsers() {
        const result = await getUsers();
        const profiles = result.data.user;
        setUsers(profiles.filter(profile => profile._id !== session?.user?._id).slice(0,3));
    }

    useEffect(()=>{
        fetchUsers();
    },[]);

    async function changeFollowStatus(userId,followed) {
        setUsers(prevUsers =>
            prevUsers.map(user =>
                user._id === userId
                    ? { ...user, followers: followed 
                        ? user.followers.filter(follower => follower !== session?.user?._id) 
                        : [...user.followers, session?.user?._id] } 
                    : user
            )
        );
    }

    const onFollow = async(userId,followed)=>{
        changeFollowStatus(userId,followed);
        const data = { 
            "newFollower" :  session?.user?._id
        }
        try{
            const result = await addFollow(userId,followed,data);
        }catch(error){
            console.log(error);
        }
    }

    return (
        <div className={styles.container}>
            {status === "loading" ? <h2>Loading...</h2> :
                <>
                    <h2>Who to follow</h2>
                    <div className={styles["list-container"]}>
                        {
                            users.map(user => (
                                <div key={user._id} className={styles.item}>
                                    <div className={styles.left}>
                                        <div className={styles.image}>
                                            {user.profileImage && 
                                                <img src={user.profileImage}></img>
                                            }
                                        </div>
                                        <div>
                                            <p>{user.username}</p>
                                            <p>@_{user.username}</p>
                                        </div>
                                    </div>
                                    <div className={styles.right}>
                                        <button onClick={()=>onFollow(user._id, user.followers.includes(session?.user?._id))}>
                                            {user.followers.includes(session?.user?._id) ? "Unfollow" : "Follow"} 
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <p>Show More</p>
                </>
            }
            
        </div>
    )
}
