import React from 'react'
import styles from './notification.module.css';
import { RiMoreFill } from "react-icons/ri";
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from "date-fns";

export default function Notification({username,message,redirectTo,createdAt}) {
    function timeAgo(date) {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    }
    return (
        <Link href={redirectTo} className={styles.container}>
            <div className={styles.left}>
                <div>
                    <Image src={xlogo} alt='xlogo' priority layout='intrinsic'></Image>
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
