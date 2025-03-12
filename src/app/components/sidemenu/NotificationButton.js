"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { RiNotification2Line } from "react-icons/ri";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { updateNotification } from '@/app/actions/notificationaction';

export default function NotificationButton({status}) {
    const [active,setActive] = useState(status);

    const updateStatus = async() =>{
        setActive(false);
        const result = await updateNotification();    
    }

    return (
        <li>
            <Link href="/notifications" onClick={updateStatus}>
                {active ? <MdOutlineNotificationsActive/> : <RiNotification2Line/>}
                <span>Notifications</span>
            </Link>
        </li>
    )
}
