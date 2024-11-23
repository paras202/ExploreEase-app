'use client';

import { Suspense } from 'react';
import { Card, Tabs, Badge } from 'flowbite-react';
import { HiUser, HiHeart, HiDocumentText, HiChartPie, HiCog } from 'react-icons/hi';
import ProfileSection from '@/app/ui/dashboard/ProfileSection';
import NotesSection from '@/app/ui/dashboard/NotesSection';
import WishlistSection from '@/app/ui/dashboard/WishlistSection';
import ActivitySection from '@/app/ui/dashboard/ActivitySection';
import SettingsSection from '@/app/ui/dashboard/SettingsSection';

// Create a client wrapper component
const DashboardContent = ({ user }) => {
  // Create tab icons components to avoid direct function passing
  const TabIcons = {
    Profile: () => <HiUser className="h-5 w-5" />,
    Notes: () => <HiDocumentText className="h-5 w-5" />,
    Wishlist: () => <HiHeart className="h-5 w-5" />,
    Activity: () => <HiChartPie className="h-5 w-5" />,
    Settings: () => <HiCog className="h-5 w-5" />
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.username || 'User'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
          {"  Here's what's happening with your account today."}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <div className="flex justify-between">
              <div>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  12
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Notes
                </p>
              </div>
              <Badge color="info">
                <TabIcons.Notes />
                +2 New
              </Badge>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between">
              <div>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  7
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Wishlist Items
                </p>
              </div>
              <Badge color="success">
                <TabIcons.Wishlist />
                Active
              </Badge>
            </div>
          </Card>

          <Card>
            <div className="flex justify-between">
              <div>
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  31
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Active Days
                </p>
              </div>
              <Badge color="warning">
                <TabIcons.Activity />
                Trending
              </Badge>
            </div>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card>
          <Tabs aria-label="Dashboard features">
            <Tabs.Item 
              active 
              title={
                <div className="flex items-center gap-2">
                  <TabIcons.Profile />
                  Profile
                </div>
              }
            >
              <Suspense fallback={<div>Loading profile...</div>}>
                <ProfileSection user={user} />
              </Suspense>
            </Tabs.Item>
            
            <Tabs.Item 
              title={
                <div className="flex items-center gap-2">
                  <TabIcons.Notes />
                  Notes
                </div>
              }
            >
              <NotesSection />
            </Tabs.Item>
            
            <Tabs.Item 
              title={
                <div className="flex items-center gap-2">
                  <TabIcons.Wishlist />
                  Wishlist
                </div>
              }
            >
              <WishlistSection />
            </Tabs.Item>
            
            <Tabs.Item 
              title={
                <div className="flex items-center gap-2">
                  <TabIcons.Activity />
                  Activity
                </div>
              }
            >
              <ActivitySection />
            </Tabs.Item>
            
            <Tabs.Item 
              title={
                <div className="flex items-center gap-2">
                  <TabIcons.Settings />
                  Settings
                </div>
              }
            >
              <SettingsSection />
            </Tabs.Item>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};


export default DashboardContent