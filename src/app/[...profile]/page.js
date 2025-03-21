import React from 'react'
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
import { formatDate } from '../helpers/birthdate';
import FollowBar from '../components/followbar/FollowBar';
import ConnectionList from '../components/connectionlist/ConnectionList';

export default async function page({searchParams, params}) {
    const queryParams = (await searchParams).type;
    const {profile} = await params;

    const cookieStore = cookies();
    const prevPagesString = (await cookieStore).get("pageHistory")?.value;
    const prevPages = JSON.parse(prevPagesString);
    // const backPage = prevPages[prevPages.length - 1] || '/home?feed=foryou';
    const backPage = (queryParams === "follower" || queryParams === "following") ? 
                    `/${profile[0]}?type=all` : prevPages[prevPages.length - 1] || '/home?feed=foryou'

    const session = await auth();
    const result = await fetchUser(profile[0]);
    const user = result.user;

    const ownProfile = profile[0] === session?.user?.username ? true : false;
    const followed = user.followers.includes(session?.user?._id) ? true : false;

    const followers = user.followers;
    const followings = user.following;

    return (    
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
                        <p>profile</p>
                    </div>
                </div>
                <div className={styles.profile}>
                    {(queryParams === "follower" || queryParams === "following") ? 
                        <>
                            <FollowBar queryParams={queryParams}/>
                            <ConnectionList
                                userId={session?.user?._id}
                                followers={followers}
                                followings={followings}
                                type={queryParams}
                            />
                        </> 
                        : 
                        <>
                            <div className={styles["profile-top"]}>
                                {user.coverImage && 
                                    <img src={user.coverImage}></img>
                                }
                            </div>
                            <div className={styles["profile-bottom"]}>
                                <div className={styles.first}>
                                    <div>
                                        <img src={user.profileImage ? user.profileImage : xlogo} alt='profile picture'></img>
                                    </div>
                                    <ProfileAction 
                                        ownProfile={ownProfile}
                                        ownId={session?.user?._id}
                                        userId={user._id}
                                        username={session?.user?.username}
                                        followed={followed}
                                    />
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
                                            <Link href={`/${profile[0]}?type=following`}>{user.following.length} following</Link>
                                            <Link href={`/${profile[0]}?type=follower`}>{user.followers.length} follower</Link>
                                        </div>
                                    </div>
                                </div>
                                <ProfileNavBar base={queryParams} ownProfile={ownProfile}/>
                                {queryParams === "likes" && 
                                    <div className={styles["likes-message"]}>
                                        <IoMdLock/>
                                        <p>Your likes are private. Only you can see them.</p>
                                    </div>
                                }
                                {(queryParams === "highlights" || queryParams === "media" || queryParams === "articles") &&
                                    <div className={styles["likes-message"]}>
                                        <TbError404/>
                                        <p>Didn't work on this page.</p>
                                    </div>
                                }
                                {(queryParams !== "highlights" && queryParams !== "media" && queryParams !== "articles") &&
                                    <Suspense fallback={<Loader/>}>
                                        <PostList page={1} user={user._id} type={queryParams}/>
                                    </Suspense>
                                }
                            
                            </div>
                        </>
                    }
                    
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
    )
}
