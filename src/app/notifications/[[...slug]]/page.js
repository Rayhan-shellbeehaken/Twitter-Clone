import React from 'react'
import styles from './page.module.css';
import ProtectedLayout from '@/app/layouts/protected/layout';
import SearchBox from '@/app/components/searchbox/SearchBox';
import Trending from '@/app/components/trending/Trending';
import WhoToFollow from '@/app/components/whotofollow/WhoToFollow';
import TermsAndCondition from '@/app/components/termsandcondition/TermsAndCondition';
import NotificationBar from '@/app/components/notificationbar/NotificationBar';
import Notification from '@/app/components/notification/Notification';

export default function Page() {
    return (
      <ProtectedLayout>
        <div className={styles.page}>
          <div className={styles.line}>
          </div>
          <div className={styles.left}>
            <NotificationBar/>
            <Notification/>
          </div>
          <div className={styles.line}>
          </div>
          <div className={styles.right}>
              <SearchBox/>
              <Trending/>
              <WhoToFollow/>
              <TermsAndCondition/>
          </div>
        </div>
      </ProtectedLayout>
    )
}
