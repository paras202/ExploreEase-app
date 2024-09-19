// app/dashboard/page.tsx
import React from 'react';
import { getCurrentUser } from '../lib/userUtils';
import UserInfo from '@/app/ui/dashboard/userInfo';

export default async function Dashboard() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-xl">Please sign in to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-500 dark:from-purple-900 dark:to-indigo-900 flex items-center justify-center p-4">
      <UserInfo user={user} />
    </div>
  );
}