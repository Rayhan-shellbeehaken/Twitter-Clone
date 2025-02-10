"use client"
import React from 'react'
import { LiaCommentAlt } from "react-icons/lia";
import { BiRepost } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";

export default function PostAction() {
    return (
        <>
            <p><LiaCommentAlt/><span>33K</span></p>
            <p><BiRepost/><span>60K</span></p>
            <p><CiHeart/><span>1.5M</span></p>
        </>
    )
}
