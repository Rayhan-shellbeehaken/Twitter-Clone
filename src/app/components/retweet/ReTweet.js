import React from 'react'
import styles from './retweet.module.css';
import Link from 'next/link';
import timeAgo from '@/app/helpers/timeago';

export default function ReTweet({id,userDetails,title,imageUrl,createdAt}) {

    const route = `/${userDetails.username}/status/${id}`;
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles["image-container"]}>
                    {userDetails.profileImage && 
                        <img src={userDetails.profileImage}></img>
                    }
                </div>
                <div className={styles.username}>
                    {userDetails.username} . <span>@{userDetails.username}</span> <span>. {timeAgo(createdAt)}</span>
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
