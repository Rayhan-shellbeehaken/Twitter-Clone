import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    try{
        const currentPath = request.nextUrl.pathname;
        console.log(currentPath);
        const token = await getToken({ req: request, secret: process.env.SECRET_TOKEN });
        console.log(token);
        if(token && currentPath==='/'){
            if(token.isNewUser){
                return NextResponse.redirect(new URL("/dateofbirth", request.url));
            }else{
                return NextResponse.redirect(new URL("/home", request.url));
            }
        }
        else if(!token && currentPath!=='/'){
            return NextResponse.redirect(new URL("/", request.url));
        }
    }catch(error){
        console.log(error);
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/","/home","/dateofbirth"],
}