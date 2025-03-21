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
import { BsFeather } from "react-icons/bs";
import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import SideBarPopUp from '../sidebarpopup/SideBarPopUp';
import SideBarProfile from '../sidebarprofile/SideBarProfile';
import { fetchNotification } from '@/app/helpers/notificationoperation';
import NotificationButton from './NotificationButton';
import MessageButton from './MessageButton';

export default async function Sidemenu() {
    const session = await auth();
    const profile = `/${session?.user?.username}?type=all`;
    const result = await fetchNotification(session?.user?._id,undefined);
    const notifications = result.notifications;
    console.log(result.notifications);
    const unreadNotification = notifications.filter(item => item.notificationStatus === "unread");
    return (
        <div className={styles.container}>
            <div className={styles.sidemenu}>
                <div className={styles.image}>
                    <Image src={xlogo} alt="xlogo" priority layout="intrinsic" />
                </div>
                <ul className={styles["menu-items"]}>
                    <li><Link href="/home?feed=foryou"><GoHomeFill/> <span>Home</span></Link></li>
                    <li><Link href="#"><IoSearch/> <span>Explore</span></Link></li>
                    <NotificationButton status={unreadNotification.length ? true : false}/>
                    <MessageButton userId={session?.user?._id}/>
                    <li><Link href="#"><VscVscode/> <span>Grok</span></Link></li>
                    <li><Link href="#"><PiBookmarkSimpleBold/> <span>Bookmarks</span></Link></li>
                    <li><Link href="#"><IoMdPeople/> <span>Communities</span></Link></li>
                    <li><Link href="#"><PiXLogoBold/> <span>Premium</span></Link></li>
                    <li><Link href="#"><GiElectric/> <span>Verified Orgs</span></Link></li>
                    <li><Link href={profile}><FaRegUser/> <span>Profile</span></Link></li>
                    <li><Link href="#"><CiCircleMore/> <span>More</span></Link></li>
                    <button className={styles.button}>
                        <BsFeather className={styles.feather}/>
                        <span>Post</span>
                    </button>
                </ul>
                <SideBarProfile username={session?.user?.username}/>
            </div>
        </div>
        
    )
}
