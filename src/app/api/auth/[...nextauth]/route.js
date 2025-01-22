import NextAuth from "next-auth";
import User from "@/app/models/user.model";
import { connect } from "@/app/db/db.config";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";


const handler = NextAuth({
    session : {
        strategy : "jwt",
        maxAge : 3600
    },
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : { label : "Email" , type : "email" },
                password : { label : "Password", type : "password" }
            },
            async authorize(credentials) {
                try{
                    await connect();
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
        async jwt({token, user}){
            if(user){
                token._id = user._id,
                token.username = user.username,
                token.email = user.email
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

export { handler as GET, handler as POST };