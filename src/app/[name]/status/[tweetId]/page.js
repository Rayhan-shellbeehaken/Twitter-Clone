import React from 'react'
import styles from './page.module.css'
import ProtectedLayout from '@/app/layouts/protected/layout'
import SearchBox from '@/app/components/searchbox/SearchBox'
import Trending from '@/app/components/trending/Trending'
import TermsAndCondition from '@/app/components/termsandcondition/TermsAndCondition'
import ReleventPeople from '@/app/components/releventpeople/ReleventPeople'
import { GoArrowLeft } from "react-icons/go";
import Link from 'next/link'
import SinglePost from '@/app/components/singlepost/SinglePost'
import { fetchATweet } from '@/app/helpers/tweetoperation'

export default async function page({params}) {
    const {tweetId} = await params;
    const tweet = await fetchATweet(tweetId);
    return (
        <ProtectedLayout>
            <div className={styles.page}>
                <div className={styles.left}>
                    <div className={styles.head}>
                        <Link href="/home" className={styles.back}>
                            <GoArrowLeft/>
                        </Link>
                        <div>Post</div>
                    </div>
                    {/* <SinglePost/> */}
                </div>
                <div className={styles.right}>
                    <SearchBox/>
                    <ReleventPeople/>
                    <Trending/>
                    <TermsAndCondition/>
                </div>
            </div>
        </ProtectedLayout>
        
    )
}