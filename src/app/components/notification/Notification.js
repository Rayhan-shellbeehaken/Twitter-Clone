import React from 'react'
import styles from './notification.module.css';
import { RiMoreFill } from "react-icons/ri";
import Link from 'next/link';
import timeAgo from '@/app/helpers/timeago';

export default function Notification({username,profileImage,message,redirectTo,createdAt}) {
    return (
        <Link href={redirectTo} className={styles.container}>
            <div className={styles.left}>
                <div>
                    <img src={profileImage} alt=''></img>
                </div>
                <div>
                    <p>{username} <span className={styles.time}>. {timeAgo(createdAt)}</span></p>
                    <p>{username} {message}</p>
                </div>
            </div>
            <div className={styles.right}>
                <RiMoreFill/>
            </div>
        </Link>
    )
}
