import { connect } from "@/app/db/db.config";
import User from "@/app/models/user.model";
import { NextResponse } from "next/server";
import bcrypt, { genSalt, hash } from "bcryptjs";

connect();

export async function POST(request) {
    try{
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        const user = await User.findOne({email : email});

        if(user){
            return NextResponse.json({message : 'User already exist.'},{status : 401});
        }

        const salt = await genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        });

        const savedUser = await newUser.save();

        return NextResponse.json({
            message : 'Registration successfully!',
            savedUser
        })
    }catch(error){
        console.log("Sign Up error occured :(");
        console.log(error);
    }
}