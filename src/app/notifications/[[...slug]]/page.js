import React from 'react'
import styles from './page.module.css';
import ProtectedLayout from '@/app/layouts/protected/layout';
import SearchBox from '@/app/components/searchbox/SearchBox';
import Trending from '@/app/components/trending/Trending';
import WhoToFollow from '@/app/components/whotofollow/WhoToFollow';
import TermsAndCondition from '@/app/components/termsandcondition/TermsAndCondition';
import NotificationBar from '@/app/components/notificationbar/NotificationBar';
import Notification from '@/app/components/notification/Notification';
import { fetchNotification } from '@/app/helpers/notificationoperation';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();
  const result = await fetchNotification(session?.user?._id);
  const notifications = result.notifications;
  console.log(notifications);

  const notificationMessage = (type) => {
    let message="";
    switch (type) {
      case "react":
        message = "reacted to your tweet"
        break;
      case "comment":
        message = "commented to your tweet"
        break;
      case "repost":
        message = "reposted your tweet"
        break;
      default:
        break;
    }
    return message;
  }
  return (
    <ProtectedLayout>
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
                  message={message}
                  redirectTo={notification.redirectTo}
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
    </ProtectedLayout>
  )
}
