import React from 'react';
import styles from './page.module.css'
import Navbar from '../components/navbar/Navbar';
import PostBox from '../components/postbox/PostBox';
import PostList from '../components/postlist/PostList';
import SearchBox from '../components/searchbox/SearchBox';
import Subscribe from '../components/subscribe/Subscribe';
import Trending from '../components/trending/Trending';
import WhoToFollow from '../components/whotofollow/WhoToFollow';
import Popup from '../components/popup/Popup';
import TermsAndCondition from '../components/termsandcondition/TermsAndCondition';
import { Suspense } from 'react';
import Loader from '../components/loader/Loader';
import { auth } from '@/auth';

export default async function Home({searchParams}) {
    const params = (await searchParams).feed || 'foryou';
    const session = await auth();
    return (
        <div className={styles.page}>
            <div className={styles.line}>
            </div>
            <div className={styles.left}>
                <Navbar/>
                <PostBox username={session?.user?.username}/>
                <Suspense fallback={<Loader/>}>
                    <PostList page={1}/>
                </Suspense>
                <Popup/>
            </div>
            <div className={styles.line}>
            </div>
            <div className={styles.right}>
                <SearchBox/>
                <Subscribe/>
                <Trending/>
                <WhoToFollow/>
                <TermsAndCondition/>
            </div>
        </div>
    )
}
