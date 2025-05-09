import React from 'react';
import { FaHome, FaSearch, FaUser, FaBell, FaCog } from 'react-icons/fa';
import Link from 'next/link';

const MobileNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden">
      <div className="flex justify-around items-center py-3">
        {/* Home Icon */}
        <Link href="/" className="flex flex-col items-center">
          <FaHome className="text-xl text-purple-600 dark:text-white" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Home</span>
        </Link>

        {/* Search Icon */}
        <Link href="/#searchBar" className="flex flex-col items-center">
          <FaSearch className="text-xl text-purple-600 dark:text-white" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Search</span>
        </Link>

        {/* Notifications Icon */}
        <Link href="/notifications" className="flex flex-col items-center">
          <FaBell className="text-xl text-purple-600 dark:text-white" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Notifications</span>
        </Link>

        {/* Profile Icon */}
        <Link href="/dashboard/profile" className="flex flex-col items-center">
          <FaUser className="text-xl text-purple-600 dark:text-white" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Profile</span>
        </Link>

        {/* Settings Icon */}
        <Link href="/dashboard/#Settings" className="flex flex-col items-center">
          <FaCog className="text-xl text-purple-600 dark:text-white" />
          <span className="text-xs text-gray-600 dark:text-gray-400">Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileNavbar;