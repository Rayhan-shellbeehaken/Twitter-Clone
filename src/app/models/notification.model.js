import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : "users",
        required : true
    },
    notificationType : {
        type : String,
        enum : ["follow","react","comment","reply","repost"],
        required : true
    },
    notifiedTo : {
        type : mongoose.Types.ObjectId,
        ref : "users",
        required : true
    },
    redirectTo : {
        type : String,
        required : true
    },
    notificationStatus : {
        type : String,
        enum : ["read","unread"],
        default : "unread"
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Notification = mongoose.models.notifications || mongoose.model("notifications",notificationSchema);

export default Notification;