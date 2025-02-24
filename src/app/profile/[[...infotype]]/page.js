import React from 'react'
import ProtectedLayout from '../../layouts/protected/layout'
import styles from './page.module.css';
import SearchBox from '@/app/components/searchbox/SearchBox';
import WhoToFollow from '@/app/components/whotofollow/WhoToFollow';
import Trending from '@/app/components/trending/Trending';
import TermsAndCondition from '@/app/components/termsandcondition/TermsAndCondition';
import { GoArrowLeft } from "react-icons/go";
import Link from 'next/link'
import { cookies } from 'next/headers'
import xlogo from '../../../../public/images/xprofile.png';
import Image from 'next/image';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";

export default async function page() {
    const cookieStore = cookies();
    const prevPagesString = (await cookieStore).get("pageHistory")?.value;
    const prevPages = JSON.parse(prevPagesString);
    const backPage = prevPages[prevPages.length - 1] || '/home?feed=foryou';

    return (
        <ProtectedLayout>      
            <div className={styles.page}>
                <div className={styles.line}>
                </div>
                <div className={styles.left}>
                    <div className={styles.head}>
                        <Link href={backPage} className={styles.back}>
                            <GoArrowLeft/>
                        </Link>
                        <div>
                            <h3>Rayhan</h3>
                            <p>2 posts</p>
                        </div>
                    </div>
                    <div className={styles.profile}>
                        <div className={styles["profile-top"]}>
                        </div>
                        <div className={styles["profile-bottom"]}>
                            <div className={styles.first}>
                                <div>
                                    <Image src={xlogo} alt='profile picture' priority layout="intrinsic"></Image>
                                </div>
                                <div>
                                    <button>Edit profile</button>
                                </div>
                            </div>
                            <div className={styles.second}>
                                <div>
                                    <div>
                                        <h3>Rayhan</h3>
                                        <p>_@Rayhan66</p>
                                    </div>
                                    <div>
                                        <RiVerifiedBadgeFill className={styles.verified}/>
                                        Get verified
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <SlCalender className={styles.calender}/>
                                        Joined January 25
                                    </div>
                                    <div>
                                        <Link href="#">2 following</Link>
                                        <Link href="#">1 follower</Link>
                                    </div>
                                </div>
                            </div>
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
