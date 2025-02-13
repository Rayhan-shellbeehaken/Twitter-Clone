import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    commentText : {
        type : String,
        required : false
    },
    commentImage : {
        type : String,
        required : false
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "users",
        required : true
    },
    replies : {
        type : [this]
    }
});

export default commentSchema;