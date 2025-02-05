import React from 'react';
import styles from './page.module.css'
import Navbar from '../components/navbar/Navbar';
import PostBox from '../components/postbox/PostBox';
import PostList from '../components/postlist/PostList';
import SearchBox from '../components/searchbox/SearchBox';
import Subscribe from '../components/subscribe/Subscribe';

export default async function Home() {

    return (
        <div className={styles.page}>
            <div className={styles.left}>
                <Navbar/>
                <PostBox/>
                <PostList/>
            </div>
            <div className={styles.right}>
                <SearchBox/>
                <Subscribe/>
            </div>
        </div>
    )
}
