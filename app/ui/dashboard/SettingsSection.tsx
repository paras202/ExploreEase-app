"use client"
import React, { useState } from 'react';
import { Card, ToggleSwitch, Button, Select } from 'flowbite-react';
import { 
  HiBell, 
  HiMoon, 
  HiGlobe, 
  HiShieldCheck, 
  HiMail 
} from 'react-icons/hi';

const SettingsSection = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [compactView, setCompactView] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Account Settings
      </h2>

      {/* Notifications */}
      <Card>
        <div className="flex items-center space-x-2 mb-4">
          <HiBell className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HiMail className="h-5 w-5" />
              <label className="text-sm font-medium">
                Email notifications
              </label>
            </div>
            <ToggleSwitch
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <HiBell className="h-5 w-5" />
              <label className="text-sm font-medium">
                Push notifications
              </label>
            </div>
            <ToggleSwitch
              checked={pushNotifications}
              onChange={setPushNotifications}
            />
          </div>
        </div>
      </Card>

      {/* Appearance */}
      <Card>
        <div className="flex items-center space-x-2 mb-4">
          <HiMoon className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Appearance</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Dark mode</label>
            <ToggleSwitch
              checked={darkMode}
              onChange={setDarkMode}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Compact view</label>
            <ToggleSwitch
              checked={compactView}
              onChange={setCompactView}
            />
          </div>
        </div>
      </Card>

      {/* Privacy */}
      <Card>
        <div className="flex items-center space-x-2 mb-4">
          <HiShieldCheck className="h-5 w-5" />
          <h3 className="text-lg font-semibold">Privacy</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Profile visibility</label>
            <Select className="w-40">
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="friends">Friends only</option>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Activity status</label>
            <ToggleSwitch
              checked={true}
              onChange={() => {}}
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button color="gray">Cancel</Button>
        <Button color="blue">Save Changes</Button>
      </div>
    </div>
  );
};

export default SettingsSection;