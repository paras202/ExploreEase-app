"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useClerk } from '@clerk/nextjs';
import { FaUser, FaCog } from 'react-icons/fa';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: any; // You might want to define a more specific type
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, user }) => {
  const { openUserProfile } = useClerk();

  return (
    <div className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 space-y-6 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        &times;
      </button>
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={user?.imageUrl || '/default-avatar.png'}
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="font-semibold">{user?.username || 'Guest'}</span>
      </div>
      <ul className="space-y-2">
        <li className="hover:bg-gray-700 p-2 rounded">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <FaUser />
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="hover:bg-gray-700 p-2 rounded">
          <button onClick={() => openUserProfile()} className="flex items-center space-x-2 w-full text-left">
            <FaCog />
            <span>Settings</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;