import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    text : {
        type : String,
        required : false
    },
    messageImage : {
        type : String,
        required : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    sender : {
        type : mongoose.Types.ObjectId,
        ref : "users" 
    }
});

export default messageSchema;