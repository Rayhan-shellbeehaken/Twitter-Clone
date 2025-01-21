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
        required : [true, "Please provide password"],
    },
    profileImage : {
        type : String,
        validate: {
            validator: function (value) {
                return /\.(jpg|jpeg|png)$/i.test(value);
            },
            message: (props) => `${props.value} is not a valid image format! Only jpg, jpeg, and png are allowed.`
        },
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