import NextAuth from "next-auth";
import User from "@/app/models/user.model";
import { connect } from "@/app/db/db.config";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

export const {
    handlers : { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    session : {
        strategy : "jwt",
        maxAge : 3600
    },
    providers : [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                name : {label : "Name", type : "text"}, // for auto login
                email : { label : "Email" , type : "email" },
                password : { label : "Password", type : "password" },
                dateofbirth : {label : "Date of Birth", type : "Date"} // for auto login
            },
            async authorize(credentials) {
                try{
                    await connect();
                    // if(credentials.name || credentials.dateofbirth){
                    //     const user = await User.findOne({email : credentials.email});
                    //     if(user){
                    //         throw new Error("User already Exist! :(");
                    //     }
                    //     const salt = await bcrypt.genSalt(10);
                    //     const hashedPassword = bcrypt.hash(credentials.password, salt);
                    //     const savedUser = await User.create({
                    //         username : credentials.name,
                    //         email : credentials.email,
                    //         password : hashedPassword,
                    //         dateofBirth : credentials.dateofbirth
                    //     })
                    //     return savedUser;
                    // }
                    console.log("EMAIL :: "+credentials.email);
                    const user = await User.findOne({email : credentials.email});
                    if(!user){
                        throw new Error("No user found :(");
                    }
                    const isValid = await bcrypt.compare(credentials.password, user.password);
                    if(!isValid){
                        throw new Error("Wrong credentials :(");
                    }
                    return user;
                }catch(error){
                    console.log(error);
                    return null;
                }
            }
        })
    ],
    callbacks : {
        async signIn({ account, profile }) {
            if(account.provider === "google") {
                console.log(`Google login with email :: ${profile.email} and name :: ${profile.name}`);
                await connect();
                let user = await User.findOne({email : profile.email});
                if(!user){
                    user = await User.create({
                        username : profile.name || "Google user",
                        email : profile.email,
                        isVerified : true
                    })
                }
                account.user = user;
            }
            if(account.provider === "github"){
                console.log(`Github login with email :: ${profile.email} and name :: ${profile.name || profile.login}`);
                await connect();
                let user = await User.findOne({email : profile.email});
                if(!user){
                    user = await User.create({
                        username : profile.name || profile.login,
                        email : profile.email,
                        isVerified : true,
                        profileImage : profile.image
                    })
                }
                account.user = user
            }
            return true;
        },
        async jwt({token, user, account}){
            if(user){
                token._id = user._id,
                token.username = user.username,
                token.email = user.email
            }

            if (account?.user) {
                token._id = account.user._id;
                token.username = account.user.username;
                token.email = account.user.email;
            }
            return token;
        },
        async session({session, token}) {
            if(token){
                session.user = {
                    _id : token._id,
                    username : token.username,
                    email : token.email
                }
            }
            return session;
        },
    },
    pages : {
        signIn : '/'
    },
    secret : process.env.SECRET_TOKEN
})