import type { Metadata } from "next";
import { Geist,JetBrains_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import {Toaster} from "sonner";
import {AuthProvider} from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });


const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "SilkenSoft",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${jetbrainsMono.variable} antialiased`}
      >
      <AuthProvider>
        {children}
        <Toaster richColors />
      </AuthProvider>
      </body>
    </html>
  );
}
