import type { Metadata } from "next";
import { Poppins, Bangers } from "next/font/google";
import "./globals.css";
import "./css/layout.css";
import "./css/user.css";
import "./css/home-animation.css"

import { WalletContextProvider } from "@/components/wallet/wallet-adapter";
import { StoryContext } from '@/context/StoryContext' 

import { Toaster } from "@/components/ui/toaster"

import AdminRegisterModal from "@/components/auth/admin-register-modal";
import AdminLoginModal from "@/components/auth/admin-login-modal";
import FullPageLoader from "@/components/general/full-page-loader";
import UserRegisterModal from "@/components/auth/user-register.modal";
import UserLoginModal from "@/components/auth/user-login-modal"

import { cn } from "@/lib/utils"
import NavbarComponent from "@/components/general/navbar-component";

const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["100", "200", "300", "400", "500", "600", "700"]
});
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
 

  return (


    <html lang="en" className=" h-svh">
      <head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body className={cn(
        "bg-gray-100 h-screen font-mono",
        // poppins.className
        )}>
      <WalletContextProvider>
          <StoryContext user={null}>
            {/* #7c2bff */}
            {/* #b688ff */}

            

            <NavbarComponent />
            {/* <div className="w-full" >
            </div> */}
            <div className="main_content bg-gray-100">
              {children}
            </div>




            <AdminRegisterModal />
            <AdminLoginModal />
            
            <UserRegisterModal />
            <UserLoginModal />

          </StoryContext>  
        </WalletContextProvider>

        <Toaster />
        <FullPageLoader />
        
      </body>
    </html>
  );
}
