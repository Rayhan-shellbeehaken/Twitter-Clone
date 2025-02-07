import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, "Please provide username"],
        unique : false
    },
    email : {
        type : String,
        required : [true, "Please provide email"],
        unique : true
    },
    password : {
        type : String,
    },
    dateofBirth : {
        type : Date,
    },
    profileImage : {
        type : String,
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verifyToken : String,
    verifyTokenExpiry : Date,
    forgetPasswordToken : String,
    forgetPasswordExpiry : Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema);

export default User;