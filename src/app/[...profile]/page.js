import React from 'react'
import ProtectedLayout from '../layouts/protected/layout'
import styles from './page.module.css';
import SearchBox from '@/app/components/searchbox/SearchBox';
import WhoToFollow from '@/app/components/whotofollow/WhoToFollow';
import Trending from '@/app/components/trending/Trending';
import TermsAndCondition from '@/app/components/termsandcondition/TermsAndCondition';
import { GoArrowLeft } from "react-icons/go";
import Link from 'next/link'
import { cookies } from 'next/headers'
import xlogo from '../../../public/images/xprofile.png';
import Image from 'next/image';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import ProfileNavBar from '../components/profilenavbar/ProfileNavBar';
import { auth } from '@/auth';
import { Suspense } from 'react';
import Loader from '../components/loader/Loader';
import PostList from '../components/postlist/PostList';
import { IoMdLock } from "react-icons/io";
import { TbError404 } from "react-icons/tb";
import { fetchUser } from '../helpers/useroperation';
import ProfileAction from '../components/profileactions/ProfileAction';
import ProfileModal from '../components/profilemodal/ProfileModal';
import Popup from '../components/popup/Popup';

export default async function page({searchParams}) {
    const params = (await searchParams).type;
    const cookieStore = cookies();
    const prevPagesString = (await cookieStore).get("pageHistory")?.value;
    const prevPages = JSON.parse(prevPagesString);
    const backPage = prevPages[prevPages.length - 1] || '/home?feed=foryou';

    const session = await auth();
    const result = await fetchUser();
    const user = result.user;
    // console.log(user);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
        });
    }

    return (
        <ProtectedLayout>      
            <div className={styles.page}>
                <Popup/>
                <ProfileModal user={user}/>
                <div className={styles.line}>
                </div>
                <div className={styles.left}>
                    <div className={styles.head}>
                        <Link href={backPage} className={styles.back}>
                            <GoArrowLeft/>
                        </Link>
                        <div>
                            <h3>{user.username}</h3>
                            <p>2 posts</p>
                        </div>
                    </div>
                    <div className={styles.profile}>
                        <div className={styles["profile-top"]}>
                        </div>
                        <div className={styles["profile-bottom"]}>
                            <div className={styles.first}>
                                <div>
                                    <img src={user.profileImage ? user.profileImage : xlogo} alt='profile picture'></img>
                                </div>
                                <ProfileAction/>
                            </div>
                            
                            <div className={styles.second}>
                                <div>
                                    <div>
                                        <h3>{user.username}</h3>
                                        <p>_@{user.username}</p>
                                    </div>
                                    <div>
                                        <RiVerifiedBadgeFill className={styles.verified}/>
                                        Get verified
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <SlCalender className={styles.calender}/>
                                        Joined {formatDate(user.createdAt)}
                                    </div>
                                    <div>
                                        <Link href="#">{user.following.length} following</Link>
                                        <Link href="#">{user.followers.length} follower</Link>
                                    </div>
                                </div>
                            </div>
                            <ProfileNavBar base={params}/>
                            {params === "likes" && 
                                <div className={styles["likes-message"]}>
                                    <IoMdLock/>
                                    <p>Your likes are private. Only you can see them.</p>
                                </div>
                            }
                            {(params === "highlights" || params === "media" || params === "articles") &&
                                <div className={styles["likes-message"]}>
                                    <TbError404/>
                                    <p>Didn't work on this page.</p>
                                </div>
                            }
                            {(params !== "highlights" && params !== "media" && params !== "articles") &&
                                <Suspense fallback={<Loader/>}>
                                    <PostList page={1} user={true} type={params}/>
                                </Suspense>
                            }
                            
                        </div>
                    </div>
                </div>
                <div className={styles.line}>
                </div>
                <div className={styles.right}>
                    <SearchBox/>
                    <WhoToFollow/>
                    <Trending/>
                    <TermsAndCondition/>
                </div>
            </div>
        </ProtectedLayout>
    )
}
