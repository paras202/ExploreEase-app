// app/ui/dashboard/ProfileSection.tsx
import React from 'react';
import { Card, Avatar, Badge } from 'flowbite-react';
import type { User } from './types/user';

interface ProfileSectionProps {
  user: User;
}

const ProfileSection = ({ user }: ProfileSectionProps) => {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4">
        <Avatar 
          img={user.imageUrl}
          rounded
          size="lg"
          placeholderInitials={user.username?.[0] || 'U'}
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user.username || 'User'}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
          <Badge color={user.isVerified ? "success" : "warning"} className="mt-2">
            {user.isVerified ? "Verified" : "Unverified"}
          </Badge>
        </div>
      </div>

      {/* Profile Details */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Contact Information
          </h3>
          <div className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Email
              </dt>
              <dd className="text-gray-900 dark:text-white">
                {user.email}
              </dd>
            </div>
            {user.phoneNumber && (
              <div>
                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phone
                </dt>
                <dd className="text-gray-900 dark:text-white">
                  {user.phoneNumber}
                </dd>
              </div>
            )}
          </div>
        </Card>

        <Card>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Account Status
          </h3>
          <div className="space-y-2">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Account ID
              </dt>
              <dd className="text-gray-900 dark:text-white">
                {user.id}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Verification Status
              </dt>
              <dd>
                <Badge color={user.isVerified ? "success" : "warning"}>
                  {user.isVerified ? "Verified Account" : "Pending Verification"}
                </Badge>
              </dd>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSection;