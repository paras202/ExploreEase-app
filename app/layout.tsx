// app/layout.tsx

import "./ui/globals.css";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/app/ui/Theme-Provider";
import SidebarWrapper from "@/app/ui/SidebarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExploreEase",
  description: "A comprehensive travel and tourism web platform!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >  
            <Navbar />
            <SidebarWrapper/>
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
