"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { SignedIn, useUser } from '@clerk/nextjs';
export default function SidebarWrapper() {

    const { isLoaded, isSignedIn, user } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

    const toggleSidebar = () => setIsSidebarOpen(prevState => !prevState);
  return (
    <div>
        <SignedIn>
         <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} />
         </SignedIn>
    </div>
  )
}
