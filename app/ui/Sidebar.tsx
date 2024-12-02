"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useClerk } from '@clerk/nextjs';
import { FaUser, FaCog, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa';
import { UserResource } from '@clerk/types';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Button } from 'flowbite-react';
interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  user: UserResource | null;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, toggleSidebar, user }) => {
  const { openUserProfile, signOut } = useClerk();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  // Close sidebar when clicking outside of it
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isSidebarOpen) {
  //       toggleSidebar();
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [isSidebarOpen, toggleSidebar]);

  // Function to handle navigation and close sidebar
  const handleNavigation = (path: string) => {
    router.push(path);
    toggleSidebar();
  };

  // Function to handle sign out and close sidebar
  const handleSignOut = async () => {
    await signOut();
    toggleSidebar();
  };

  return (
    <>
      {/* Toggle button - always in the same position */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 left-0 z-50 w-3 h-16 bg-gray-300 dark:bg-gray-600 rounded-r-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-500 cursor-pointer transform -translate-y-1/2 transition-colors duration-300"
        aria-label="Toggle Sidebar"
      >
        {/* Line button */}
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full z-40 bg-white dark:bg-gray-800 shadow-lg transition-transform transform w-64 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center space-x-4 mb-6 p-2">
            <Image
              src={user?.imageUrl || '/default-avatar.png'}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-semibold text-gray-800 dark:text-white">{user?.username || 'Guest'}</span>
            <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 gap-1 md:w-12 md:h-10 sm:inline"
            color="gray"
          >
            {theme === "dark" ? <FaSun className="md:text-xl" /> : <FaMoon className="md:text-xl text-purple-600" />}
          </Button>
          </div>
          <ul className="space-y-2">
            <li>
              <button onClick={() => handleNavigation('/dashboard')} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaUser className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Dashboard</span>
              </button>
            </li>
            <li>
              <button onClick={() => { openUserProfile(); toggleSidebar(); }} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaCog className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Account</span>
              </button>
            </li>
            <li>
              <button onClick={handleSignOut} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaSignOutAlt className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Sign Out</span>
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation('/scheduler')} className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <FaUser className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Scheduler</span>
              </button>
            </li>
          </ul>
          
        </div>
      </div>
    </>
  );
};

export default Sidebar;