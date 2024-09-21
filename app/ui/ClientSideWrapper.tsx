'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Navbar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";
import SidebarWrapper from "@/app/ui/SidebarWrapper";
import MobileNavbar from "@/app/ui/MobileNavbar";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';
  
  const [isMounted, setIsMounted] = useState(false);

  // Prevent rendering on server to avoid mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Render nothing until mounted
  }

  return (
    <>
      <SignedIn>
        <Navbar />
        <SidebarWrapper />
        <main>{children}</main>
        <Footer />
        <MobileNavbar />
      </SignedIn>
      <SignedOut>
        {isLandingPage ? (
          <main className="h-screen">{children}</main>
        ) : (
          <>
            <Navbar />
            <SidebarWrapper />
            <main>{children}</main>
            <Footer />
            <MobileNavbar />
          </>
        )}
      </SignedOut>
    </>
  );
};

export default PageWrapper;
