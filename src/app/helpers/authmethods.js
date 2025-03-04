import { connect } from "../db/db.config";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export async function userAuthorize(credentials) {
    try{
        return (credentials.name || credentials.dateofBirth) ? await registration(credentials) : await login(credentials);
    }catch(error){
        throw error;
    }
}

async function login(credentials) {
    try{
        await connect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
            throw new Error("No user found :(");
        }
        const isValid = await bcrypt.compare(credentials.password,user.password);
        if (!isValid) {
            throw new Error("Wrong credentials :(");
        }
        return user;
    }catch(error){
        throw error;
    }
}

async function registration(credentials) {
    try{
        await connect();
        const user = await User.findOne({email : credentials.email});
        if(user){
            throw new Error("User already Exist! :(");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(credentials.password, salt);
        const correctedDate = credentials.dateofbirth.replace(/,/, ", ");
        const birthDate = new Date(correctedDate);
        birthDate.setHours(12, 0, 0, 0);

        const formattedDate = birthDate.toISOString().split("T")[0];

        const savedUser = await User.create({
            username : credentials.name,
            email : credentials.email,
            password : hashedPassword,
            dateofBirth : formattedDate
        })
        return savedUser;
    }catch(error){
        throw error;
    }
}

export async function OAuthLogin(account, profile) {
    
    try{
        await connect();
        let user = await User.findOne({ email: profile.email });
        let userName;
        let image;
        if(account.provider === "google"){
            userName = profile.name || "Google User";
            console.log("GOOGLE PROFILE PICTURE");
            console.log(profile.picture);
            image = profile.picture;
        }else if(account.provider === "github"){
            userName = profile.login || profile.name;
            image = profile.image
        }
        if(!user){
            user = await User.create({
                username: userName,
                email: profile.email,
                isVerified: true,
                profileImage: image
            });
            account.isNewUser = true;
        }else account.isNewUser = false;

        account.user = user;
    }catch(error){
        throw error;
    }
}