import React from 'react'
import styles from './whotofollow.module.css'
import Image from 'next/image';
import xprofile from '../../../../public/images/xprofile.png'

export default function WhoToFollow() {
    const items = [
        {
            indx: 0,
            username: "Physics Today",
            accountName: "@PhysicsToday"
        },
        {
            indx: 1,
            username: "Elon Mask",
            accountName: "@elonmusk"
        },
        {
            indx: 2,
            username: "NASA",
            accountName: "@NASA"
        }
    ]

    return (
        <div className={styles.container}>
            <h2>Who to follow</h2>
            <div className={styles["list-container"]}>
                {
                    items.map(item => (
                        <div key={item.indx} className={styles.item}>
                            <div className={styles.left}>
                                <div className={styles.image}>
                                    <Image src={xprofile} alt='xlogo' priority layout='intrinsic'></Image>
                                </div>
                                <div>
                                    <p>{item.username}</p>
                                    <p>{item.accountName}</p>
                                </div>
                            </div>
                            <div className={styles.right}>
                                <button>Follow</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <p>Show More</p>
        </div>
    )
}
