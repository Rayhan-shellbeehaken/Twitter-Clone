import React from 'react'
import styles from './releventpeople.module.css'
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';

export default function ReleventPeople() {
    return (
        <div className={styles.container}>
            <h2>Relevent People</h2>
            <div className={styles.profile}>
                <div className={styles["profile-left"]}>
                    <div className={styles["profile-image"]}>
                        <Image src={xlogo} alt='xlogo' priority layout='intrinsic'></Image>
                    </div>
                    <div className={styles["profile-info"]}>
                        <h3>Rayhan</h3>
                        <p>@_Rayhan66</p>
                    </div>
                </div>
                <div className={styles["profile-right"]}>
                    <button>Follow</button>
                </div>
            </div>
        </div>
    )
}
