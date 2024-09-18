// app/layout.tsx

import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from 'next-themes';

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
      <html lang="en">
      <ThemeProvider attribute="class" defaultTheme="light">
        <body className={inter.className}>
          
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
        </ThemeProvider>

      </html>
    </ClerkProvider>
  );
}
