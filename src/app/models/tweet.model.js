import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    postText : {
        type : String,
        required : false
    },
    postImage: {
        type: Buffer,
        required: false,
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "users"
    }
})

const Tweet = mongoose.models.tweets || mongoose.model("tweets",tweetSchema);

export default Tweet;