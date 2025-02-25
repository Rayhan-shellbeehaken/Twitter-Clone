"use client"
import React, { useState } from 'react'
import styles from './profilemodal.module.css';
import { FiX } from "react-icons/fi";
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import DateOfBirth from '../dateofbirth/DateOfBirth';
import { useAppContext } from '@/app/store/store';
import { RiCameraAiLine } from "react-icons/ri";
import { useRef, useEffect } from 'react';

export default function ProfileModal() {
    const {profileModal, setProfileModal} = useAppContext();
    const [file,setFile] = useState("");
    const [proFile,setProFile] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const fileRef = useRef(null);
    const profileRef = useRef(null);

    useEffect(()=>{
        if(file){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setImagePreview(reader.result);
            }
            reader.readAsDataURL(file);
        }
    },[file]);

    useEffect(()=>{
        if(proFile){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setProfileImage(reader.result);
            }
            reader.readAsDataURL(proFile);
        }
    },[proFile]);

    const removeCoverPhoto = () =>{
        setImagePreview(null);
        setFile("");
    }

    return (
        profileModal &&
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.head}>
                    <div className={styles["head-left"]}>
                        <div onClick={()=>setProfileModal(false)}>
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
                        <div className={`${styles.camera} ${imagePreview? styles["state-1"] : styles["state-2"]}`}>
                            <div className={styles["icon-container"]} onClick={()=>fileRef.current.click()}>
                                <RiCameraAiLine />
                            </div>
                            
                            <div className={`${styles["icon-container"]} ${imagePreview !== null? '' : styles.hidden}`} onClick={removeCoverPhoto}>
                                <FiX/>
                            </div>
                        </div>
                        <input type='file' ref={fileRef} onChange={(e)=>setFile(e.target.files[0])}></input>
                        {imagePreview && 
                            <img src={imagePreview} alt='cover picture'></img>
                        }
                        
                    </div>

                    <div className={styles["profile-pic"]}>
                        
                        <div className={styles["profile-pic-container"]}>
                            <input type='file' ref={profileRef} onChange={(e)=>setProFile(e.target.files[0])}></input>
                            <div className={styles["icon-container"]} onClick={()=>profileRef.current.click()}>
                                <RiCameraAiLine />
                            </div>
                            <Image src={profileImage ? profileImage : xlogo} width={100} height={100} alt='profile picture'></Image>
                            
                        </div>
                        
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
