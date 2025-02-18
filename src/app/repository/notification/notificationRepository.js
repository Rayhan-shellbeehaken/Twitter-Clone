import Notification from "@/app/models/notification.model";
import mongoose from "mongoose";

export async function addNotification(user,notificationType,notifiedTo,redirectTo) {
    const data = new Notification({
        user,
        notificationType,
        notifiedTo,
        redirectTo
    });
    const notification = await data.save();
    return notification;
}

export async function getNotifications(user) {
    const notifications = await Notification.aggregate([
        {
            $match : {notifiedTo : new mongoose.Types.ObjectId(user)}
        },
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user_details"
          }
        },
        {
          $addFields: {
            "user_details": {
              $arrayElemAt : ["$user_details",0]
            }
          }
        },
        {
          $project: {
            user : 0,
            __v : 0,
            "user_details.__v" : 0,
            "user_details.email" : 0,
            "user_details.isVerified" : 0,
            "user_details.dateofBirth" : 0
          }
        }
    ]).sort({createdAt : -1});

    return notifications;
}