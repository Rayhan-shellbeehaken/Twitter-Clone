import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    parent : {
        type : mongoose.Types.ObjectId,
        default : null
    },
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
    commenters : [
        {
            type : mongoose.Types.ObjectId,
            ref : "users",
            required : false
        }
    ],
    user : {
        type : mongoose.Types.ObjectId,
        ref : "users"
    },
    repostedTweet : {
        type : mongoose.Types.ObjectId,
        ref : "tweets",
        default : null
    }
    
})

const Tweet = mongoose.models.tweets || mongoose.model("tweets",tweetSchema);

export default Tweet;