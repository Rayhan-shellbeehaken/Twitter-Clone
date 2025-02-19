import React from 'react'
import styles from './notification.module.css';
import { RiMoreFill } from "react-icons/ri";
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';

export default function Notification() {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div>
                    <Image src={xlogo} alt='xlogo' priority layout='intrinsic'></Image>
                </div>
                <div>
                    <p>Rayhan-shellbeehaken</p>
                    <p>Rayhan-shellbeehaken followed you</p>
                </div>
            </div>
            <div className={styles.right}>
                <RiMoreFill/>
            </div>
        </div>
    )
}
