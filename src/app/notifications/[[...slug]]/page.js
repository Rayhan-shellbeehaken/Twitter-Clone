import React from 'react'
import styles from './page.module.css';
import SearchBox from '@/app/components/searchbox/SearchBox';
import Trending from '@/app/components/trending/Trending';
import WhoToFollow from '@/app/components/whotofollow/WhoToFollow';
import TermsAndCondition from '@/app/components/termsandcondition/TermsAndCondition';
import NotificationBar from '@/app/components/notificationbar/NotificationBar';
import Notification from '@/app/components/notification/Notification';
import { fetchNotification, notificationMessage } from '@/app/helpers/notificationoperation';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';

export default async function Page({params}) {
  const session = await auth();
  const slug = (await params)?.slug || [];
  const result = await fetchNotification(session?.user?._id,slug[0]);
  const notifications = result.notifications;

  const allowedPaths = [undefined, 'followed', 'tweets'];
  if(!allowedPaths.includes(slug[0])){
    notFound();
  }
  
  return (
      <div className={styles.page}>
        <div className={styles.line}>
        </div>
        <div className={styles.left}>
          <NotificationBar/>
          {
            notifications.map(notification => {
              let message = notificationMessage(notification.notificationType);
              return (
                <Notification
                  key={notification._id}
                  username={notification.user_details.username}
                  profileImage={notification.user_details.profileImage}
                  message={message}
                  redirectTo={notification.redirectTo}
                  createdAt={notification.createdAt}
                />
              );
            })
          }

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
  )
}
