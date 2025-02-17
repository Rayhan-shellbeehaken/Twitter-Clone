import React from 'react'
import styles from './retweet.module.css';
import xlogo from '../../../../public/images/xprofile.png'
import Image from 'next/image';

export default function ReTweet() {
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <div className={styles["image-container"]}>
                    <Image src={xlogo} alt="xlogo" priority layout="intrinsic"/>
                </div>
                <div className={styles.username}>
                    SpaceX <span>@SpaceX</span>
                </div>
            </div>
            <div className={styles.content}>
                <p>
                    Falcon 9 lands on the A Shortfall of Gravitas droneship,
                    completing the first 26th launch and landing of an orbital class rocket
                </p>
                <Image src={xlogo} alt="xlogo" priority height={200}/>
            </div>
        </div>
    )
}
