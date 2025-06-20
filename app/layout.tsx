import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";
import QueryProvider from "@/providers/query-provider";
import Navbar from "@/components/Navbar/navbar";
import TitleBar from "@/components/Navbar/title-bar";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ToastContainer, toast } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acme.inc | Inventory App",
  description: "Manage your business with Acme.inc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <ThemeProvider>
          <QueryProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
        >
          <AntdRegistry>
            <div className="flex flex-row h-screen">
              <Navbar drawer={false}></Navbar>
              <div className="flex flex-1 flex-col">
                <TitleBar></TitleBar>
                <div className="flex-1 p-3">
                  {children}
                  <ToastContainer position="top-right" autoClose={3000} />
                </div>
                
              </div>
              
          </div>
          </AntdRegistry>
          
          
          
        </body>
      </QueryProvider>
    </ThemeProvider>
    </html>
  );
}
