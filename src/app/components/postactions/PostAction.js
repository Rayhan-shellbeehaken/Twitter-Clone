"use client"
import React from 'react'
import { LiaCommentAlt } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { TiHeartFullOutline } from "react-icons/ti";
import styles from './postaction.module.css';
import { useState } from 'react';

export default function PostAction({id,totalReact}) {
    const [reacted,setReacted] = useState(false);

    const onReact = () => {
        setReacted(!reacted);
    }

    return (
        <>
            <p><LiaCommentAlt/><span>33K</span></p>
            <p><BiRepost/><span>60K</span></p>

            <p className={`${reacted ? styles.react : ''}`} onClick={onReact}>
                {reacted ? 
                    <TiHeartFullOutline/> : 
                    <CiHeart/>
                }
                <span>{totalReact}</span>
            </p>
        </>
    )
}
