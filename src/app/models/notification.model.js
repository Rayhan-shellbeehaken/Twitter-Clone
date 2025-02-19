import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    user : {
        type : mongoose.Types.ObjectId,
        ref : "users",
        required : true
    },
    notificationType : {
        type : String,
        enum : ["follow","react","comment","repost"],
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
    createdAt : {
        type : Date,
        default : Date.now
    }
})

const Notification = mongoose.models.notifications || mongoose.model("notifications",notificationSchema);

export default Notification;