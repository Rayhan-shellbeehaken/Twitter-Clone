"use client"
import React, { useEffect } from 'react'
import { LiaCommentAlt } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { TiHeartFullOutline } from "react-icons/ti";
import styles from './postaction.module.css';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import CommentPopUp from '../commentpopup/CommentPopUp';

export default function PostAction({id,reacters}) {
    const [reacted,setReacted] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const [show,setShow] = useState(false);

    useEffect(()=>{
        setReacted(reacters.includes(session?.user?._id));
    },[reacters,session]);

    const onReact = async() => {
        reacted ? 
        reacters = reacters.filter(userId => userId !== session?.user?._id) :
        reacters.push(session?.user?._id); 

        const data = {
            reacters : reacters
        }

        try{
            const tweet = await axios.patch(`/api/tweets?id=${id}`,data)
            console.log(tweet);
            router.refresh();
        }catch(error){
            console.log(error);
        }   
    }

    const onComment = async() => {
        setShow(!show);
    }

    return (
        <>
            {show && <CommentPopUp setShow={setShow}/>}
            <p onClick={onComment}><LiaCommentAlt/><span>33K</span></p>
            <p><BiRepost/><span>60K</span></p>

            <p className={`${reacted ? styles.react : ''}`} onClick={onReact}>
                {reacted ? 
                    <TiHeartFullOutline/> : 
                    <CiHeart/>
                }
                <span>{reacters.length || 0}</span>
            </p>
        </>
    )
}
