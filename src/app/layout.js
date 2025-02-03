import "./globals.css";
import AppWrapper from "./store/store";
import { Geologica } from 'next/font/google';
import { auth } from "@/auth";
import Sidemenu from "./components/sidemenu/Sidemenu";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const geologica = Geologica({subsets : ["latin"], weight : ["100", "200", "300", "400", "500", "600"]});

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${geologica.className} background`}>
        {session?.user &&
          <Sidemenu/>
        }
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
