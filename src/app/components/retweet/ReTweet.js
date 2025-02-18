import React from 'react'
import styles from './retweet.module.css';
import xlogo from '../../../../public/images/xprofile.png'
import Image from 'next/image';
import Link from 'next/link';

export default function ReTweet({id,userDetails,title,imageUrl}) {
    const route = `/${userDetails.username}/status/${id}`;
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles["image-container"]}>
                    <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
                </div>
                <div className={styles.username}>
                    {userDetails.username} <span>@{userDetails.username}</span>
                </div>
            </div>
            <Link href={route} className={styles.content}>
                <div>
                    {title}
                </div>
                {imageUrl && 
                    <img src={imageUrl} alt="xlogo" height={200}/>
                }
            </Link>
        </div>
    )
}
