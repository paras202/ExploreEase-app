// app/ui/dashboard/userInfo.tsx
import React from 'react';
import Image from "next/image";

// Define the shape of the user object
interface User {
    id: string;
    username: string | null;  // Changed from string | undefined to string | null
    email: string;
    imageUrl: string;
    phoneNumber: string;
    isVerified: boolean;
  }

// Define the props for the UserInfo component
interface UserInfoProps {
  user: User;
}

export default function UserInfo({ user }: UserInfoProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full">
      <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Hi, {user.username || "Guest"}!
      </h1>
      
      <div className="flex justify-center mb-6 ">
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt="User Avatar"
            className="rounded-full shadow-md shadow-gray-500"
            width={120}
            height={120}
          />
        ) : (
          <div className="bg-gray-700 rounded-full w-28 h-28 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>
      
      <div className="text-left space-y-4 text-gray-800 dark:text-gray-300 ">
        <p className="text-lg">
          <span className="font-semibold text-gray-800 dark:text-white">Username: </span>{user.username || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-800 dark:text-white">Email: </span>{user.email || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-800 dark:text-white">Phone: </span>{user.phoneNumber || "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-semibold text-gray-800 dark:text-white">Account Verified: </span>
          {user.isVerified ? "Yes" : "No"}
        </p>
      </div>
      
      <div className="border-t-2 border-gray-700 dark:border-gray-100 my-6"></div>
      
      <p className="text-center text-gray-900 dark:text-white text-sm">
        Thank you for visiting!
      </p>
    </div>
  );
}