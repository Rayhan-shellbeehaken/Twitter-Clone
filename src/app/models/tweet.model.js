import mongoose from "mongoose";
import commentSchema from "./schemas/comment.schema";

const tweetSchema = new mongoose.Schema({
    postText : {
        type : String,
        required : false
    },
    postImage: {
        type : String,
        required : false,
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    reacters : [{
        type : mongoose.Types.ObjectId,
        ref : "users",
        required: false,
    }],
    commenters : [commentSchema],
    user : {
        type : mongoose.Types.ObjectId,
        ref : "users"
    },
    
})

const Tweet = mongoose.models.tweets || mongoose.model("tweets",tweetSchema);

export default Tweet;