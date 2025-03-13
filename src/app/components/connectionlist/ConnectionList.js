"use client"
import React, { useEffect, useState } from 'react';
import styles from './connection.module.css';
import { addFollow } from '@/app/actions/useraction';
import { useRouter } from 'next/navigation';

export default function ConnectionList({ userId, followers, followings, type }) {
    const [userList, setUserList] = useState(type === "following" ? followings : followers);
    const [followingList, setFollowingList] = useState(new Set(followings.map(user => user._id)));
    const router = useRouter();

    useEffect(() => {
        setUserList(type === "following" ? followings : followers);
    }, [type, followings]);

    async function toggleFollow(friendId) {
        const isFollowing = followingList.has(friendId);
        
        setFollowingList(prev => {
            const newSet = new Set(prev);
            isFollowing ? newSet.delete(friendId) : newSet.add(friendId);
            return newSet;
        });

        try {
            await addFollow(friendId, isFollowing, { "newFollower": userId });
        } catch (error) {
            console.error(error);
            setFollowingList(prev => {
                const newSet = new Set(prev);
                isFollowing ? newSet.add(friendId) : newSet.delete(friendId);
                return newSet;
            });
        }
    }

    return (
        <div className={styles.container}>
            {userList.map(user => (
                <div key={user._id} className={styles.user}>
                    <div className={styles.left}>
                        <div className={styles.image}>
                            {user.profileImage && <img src={user.profileImage} alt={user.username} />}
                        </div>
                        <div className={styles.info}>
                            <p>{user.username}</p>
                            <p>@_{user.username}</p>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <button onClick={() => toggleFollow(user._id)}>
                            {followingList.has(user._id) ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
