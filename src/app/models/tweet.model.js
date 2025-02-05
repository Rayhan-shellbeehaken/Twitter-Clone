import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
    postText : {
        type: String
    },
    image : {
        type : String,
        validate: {
            validator: function (value) {
                return /\.(jpg|jpeg|png)$/i.test(value);
            },
            message: (props) => `${props.value} is not a valid image format! Only jpg, jpeg, and png are allowed.`
        },
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref: "users"
    }
})

const Tweet = mongoose.models.tweets || mongoose.model("tweets",tweetSchema);

export default Tweet;