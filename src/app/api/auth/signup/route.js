import { connect } from "@/app/db/db.config";
import User from "@/app/models/user.model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
    try{
        const reqBody = await request.json();
        const { username, email, password, dateofBirth } = reqBody;

        const user = await User.findOne({email : email});

        if(user){
            return NextResponse.json({message : 'User already exist.'},{status : 401});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password : hashedPassword,
            dateofBirth
        });

        const savedUser = await newUser.save();

        const payload = {
            _id : savedUser._id,
            username : savedUser.username,
            email : savedUser.email
        }

        const token = jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn : '1h'});
        const response = NextResponse.json({message : 'Registration successfully', savedUser});

        response.cookies.set("next-auth.session-token",token,{
            httpOnly : true
        });

        return response;
    }catch(error){
        console.log("Sign Up error occured :(");
        console.log(error);
    }
}