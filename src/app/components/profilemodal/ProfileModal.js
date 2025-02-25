import React from 'react'
import styles from './profilemodal.module.css';
import { FiX } from "react-icons/fi";
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import DateOfBirth from '../dateofbirth/DateOfBirth';

export default function ProfileModal() {
    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.head}>
                    <div className={styles["head-left"]}>
                        <div>
                            <FiX className={styles.cross}/>
                        </div>
                        <div>
                            Edit profile
                        </div>
                    </div>
                    <button className={styles["head-right"]}>
                        Save
                    </button>
                </div>
                <div>
                    <div className={styles.cover}>
                        Cover pic
                    </div>
                    <div className={styles["profile-pic"]}>
                        <Image src={xlogo} width={100} height={100} alt='profile picture' priority layout="intrinsic"></Image>
                    </div>
                    <div className={styles["input-box-container"]}>
                        <input className={styles.input} id='name' required></input>
                        <label className={styles.label} htmlFor='name'>Name</label>
                    </div>
                    <div className={styles["date-of-birth"]}>
                        <DateOfBirth/>
                    </div>
                    <div className={styles["info-text"]}>
                        <p>
                            By updating, you agree to the <span>Terms of Service</span> and <span>Privacy Policy</span>, 
                            including <span>Cookie Use</span>. X may use your contact information, including your email 
                            address and phone number for purposes outlined in our Privacy Policy, like keeping 
                            your account secure and personalizing our services, including ads. <span>Learn more</span>
                            Others will be able to find you by email or phone number, when provided, unless 
                            you choose otherwise <span>here</span>.
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
