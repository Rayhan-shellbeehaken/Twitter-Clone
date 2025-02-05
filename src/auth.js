import NextAuth from "next-auth";
import { userAuthorize } from "./app/helpers/authmethods";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { OAuthLogin } from "./app/helpers/authmethods";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 3600,
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { },
        email: { },
        password: { },
        dateofbirth: { },
      },
      async authorize(credentials) {
        try {
          return await userAuthorize(credentials);
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google" || account.provider === "github") {
        console.log("PREV :: ");
        console.log(account?.user);
        await OAuthLogin(account, profile);
        console.log("NEW :: ");
        console.log(account?.user);
      }
      return true;
    },
    async jwt({ token, user, account, isNewUser }) {
      if (user) {
        token._id = user._id;
        token.username = user.username;
        token.email = user.email;
        token.isNewUser = isNewUser;
      }
      if (account?.user) {
        token._id = account.user._id;
        token.username = account.user.username;
        token.email = account.user.email;
        token.isNewUser = account.isNewUser;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id,
          username: token.username,
          email: token.email,
          isNewUser : token.isNewUser
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.SECRET_TOKEN,
};


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions);
