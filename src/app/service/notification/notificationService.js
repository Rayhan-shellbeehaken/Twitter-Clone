import { addNotification, getNotifications } from "@/app/repository/notification/notificationRepository";

export async function addNewNotification(user,request) {
    const requestBody = await request.json();
    const {notificationType, notifiedTo, redirectTo} = requestBody;
    const notification = await addNotification(user,notificationType,notifiedTo,redirectTo);
    return notification;   
}

export async function getAllNotifications(user,category) {
    const notifications = await getNotifications(user,category);
    return notifications;
}