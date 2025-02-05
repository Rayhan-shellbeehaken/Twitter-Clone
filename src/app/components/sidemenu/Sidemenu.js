import React from 'react'
import styles from "./sidemenu.module.css";
import xlogo from '../../../../public/images/xprofile.png';
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { RiNotification2Line } from "react-icons/ri";
import { FiMail } from "react-icons/fi";
import { VscVscode } from "react-icons/vsc";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { IoMdPeople } from "react-icons/io";
import { PiXLogoBold } from "react-icons/pi";
import { GiElectric } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import { RiMoreFill } from "react-icons/ri";
import { BsFeather } from "react-icons/bs";

import Image from 'next/image';
import Link from 'next/link';

export default function Sidemenu() {

    return (
        <div className={styles.container}>
            <div className={styles.sidemenu}>
                <div className={styles.image}>
                    <Image src={xlogo} alt="xlogo" priority layout="intrinsic" />
                </div>
                <ul className={styles["menu-items"]}>
                    <li><Link href="#"><GoHomeFill/> <span>Home</span></Link></li>
                    <li><Link href="#"><IoSearch/> <span>Explore</span></Link></li>
                    <li><Link href="#"><RiNotification2Line/> <span>Notifications</span></Link></li>
                    <li><Link href="#"><FiMail/> <span>Messages</span></Link></li>
                    <li><Link href="#"><VscVscode/> <span>Grok</span></Link></li>
                    <li><Link href="#"><PiBookmarkSimpleBold/> <span>Bookmarks</span></Link></li>
                    <li><Link href="#"><IoMdPeople/> <span>Communities</span></Link></li>
                    <li><Link href="#"><PiXLogoBold/> <span>Premium</span></Link></li>
                    <li><Link href="#"><GiElectric/> <span>Verified Orgs</span></Link></li>
                    <li><Link href="#"><FaRegUser/> <span>Profile</span></Link></li>
                    <li><Link href="#"><CiCircleMore/> <span>More</span></Link></li>
                    <button className={styles.button}>
                        <BsFeather className={styles.feather}/>
                        <span>Post</span>
                    </button>
                </ul>
            
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
                    
                    <div className={styles["profile-more"]}>
                        <RiMoreFill/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}
