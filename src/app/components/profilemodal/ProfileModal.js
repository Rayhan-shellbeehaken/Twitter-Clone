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
import daysDeclaration from '@/app/helpers/birthdate';
import SelectorInput from '@/app/components/selectorinput/SelectorInput';
import width from '@/app/components/css/width.module.css';
import { Months } from '@/app/helpers/birthdate';
import axios from 'axios';
import Popup from '../popup/Popup';
import { useRouter } from 'next/navigation';

export default function ProfileModal({user}) {
    const {profileModal, setProfileModal, toggleAlert} = useAppContext();
    const [file,setFile] = useState("");
    const [proFile,setProFile] = useState("");
    const [imagePreview, setImagePreview] = useState(user.coverImage);
    const [profileImage, setProfileImage] = useState(user.profileImage);
    const fileRef = useRef(null);
    const profileRef = useRef(null);
    const [userInfo,setUserInfo] = useState({name : user.username , dateofBirth : user.dateofBirth});
    const [dateofBirth, setDateofBirth] = useState({Month : '', Day : '', Year : ''});
    const router = useRouter();

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

    useEffect(()=>{
        const [year, month, date] = user.dateofBirth.split("T")[0].split("-");
        const monthName = Months[parseInt(month,10)].name;
        setDateofBirth({Month : monthName, Year : year, Day : date});
    },[]);

    const removeCoverPhoto = () =>{
        setImagePreview(null);
        setFile("");
    }

    const changeUserInfo = (e) =>{
        setUserInfo((prevInfo)=>({
            ...prevInfo,
            name : e.target.value
        }))
    }

    const handleChange = (type, event) => {
        if(type === 'Month'){
            daysDeclaration(event.target.value,dateofBirth.Year);
        }else if(type === "Year"){
            daysDeclaration(dateofBirth.Month,event.target.value);
        }
        setDateofBirth((prevState) => ({
            ...prevState,
            [type] : event.target.value
        }))
    }

    const onUpdate = async() => {
        const birth = new Date(`${dateofBirth.Month} ${dateofBirth.Day}, ${dateofBirth.Year}`);
        birth.setHours(12, 0, 0, 0);
        const formattedDate = birth.toISOString().split("T")[0];

        const data = {
            coverImage : imagePreview,
            profileImage : profileImage,
            username : userInfo.name,
            dateofBirth : formattedDate
        }
        try{
            const result = await axios.patch('/api/user',data);
            console.log(result);
            setProfileModal(false);
            toggleAlert("success","Saved successfully");
            router.refresh();
        }catch(error){
            console.log(error);
            toggleAlert("error","Failed to update");
        }
        
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
                    <button className={styles["head-right"]} onClick={onUpdate}>
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
                        {(imagePreview || user.coverImage) &&
                            <img src={imagePreview ? imagePreview : user.coverImage} alt='cover picture'></img>
                        }
                    </div>

                    <div className={styles["profile-pic"]}>
                        
                        <div className={styles["profile-pic-container"]}>
                            <input type='file' ref={profileRef} onChange={(e)=>setProFile(e.target.files[0])}></input>
                            <div className={styles["icon-container"]} onClick={()=>profileRef.current.click()}>
                                <RiCameraAiLine />
                            </div>
                            <Image src={profileImage ? profileImage : user.profileImage || xlogo} width={100} height={100} alt='profile picture'></Image>
                            
                        </div>
                        
                    </div>
                    <div className={styles["input-box-container"]}>
                        <input value={userInfo.name} onChange={changeUserInfo} className={styles.input} id='name' required></input>
                        <label className={styles.label} htmlFor='name'>Name</label>
                    </div>
                    <div className={styles["date-of-birth"]}>
                        <SelectorInput value={dateofBirth.Month} width={width["width-200"]} label="Month" onChange={(e) => handleChange("Month",e)}/>
                        <SelectorInput value={dateofBirth.Day} width={width["width-85"]} label="Day" onChange={(e) => handleChange("Day",e)}/>
                        <SelectorInput value={dateofBirth.Year} width={width["width-150"]} label="Year" onChange={(e) => handleChange("Year",e)}/>
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
