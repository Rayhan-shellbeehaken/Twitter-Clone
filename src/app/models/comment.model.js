import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentText : {
        type : String,
        required : false
    },
    commentImage : {
        type : Buffer,
        required : false
    },
    tweet : {
        type : mongoose.Types.ObjectId,
        ref : "tweets"
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "users"
    }
})

const Comment = mongoose.models.comments || mongoose.model("comments",commentSchema);

export default Comment;