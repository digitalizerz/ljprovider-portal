import React, { useState } from 'react';
import { Bell, Shield, CreditCard, Globe, Moon, Sun, Save } from 'lucide-react';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    appointmentReminders: true,
    messageNotifications: true,
    
    // Privacy
    profileVisibility: 'public',
    showOnlineStatus: true,
    allowDirectBooking: true,
    
    // Appearance
    theme: 'light',
    language: 'en',
    timezone: 'America/New_York',
    
    // Security
    twoFactorAuth: false,
    sessionTimeout: '30',
    
    // Payment
    autoWithdraw: false,
    withdrawThreshold: '500',
    preferredPaymentMethod: 'bank'
  });

  const handleToggle = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleChange = (key: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // In real app, save to backend
    console.log('Saving settings:', settings);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and platform settings</p>
      </div>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="glass-card rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center mb-6">
            <Bell className="w-6 h-6 text-lovejoy-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800">Notifications</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle('emailNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lovejoy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lovejoy-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive push notifications on your device</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle('pushNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lovejoy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lovejoy-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Appointment Reminders</p>
                <p className="text-sm text-gray-600">Get reminded about upcoming appointments</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.appointmentReminders}
                  onChange={() => handleToggle('appointmentReminders')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lovejoy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lovejoy-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="glass-card rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center mb-6">
            <Shield className="w-6 h-6 text-lovejoy-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800">Privacy & Security</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Visibility</label>
              <select
                value={settings.profileVisibility}
                onChange={(e) => handleChange('profileVisibility', e.target.value)}
                className="glass-input w-full px-3 py-2 rounded-lg"
              >
                <option value="public">Public - Visible to all patients</option>
                <option value="limited">Limited - Only verified patients</option>
                <option value="private">Private - By referral only</option>
              </select>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lovejoy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lovejoy-600"></div>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
              <select
                value={settings.sessionTimeout}
                onChange={(e) => handleChange('sessionTimeout', e.target.value)}
                className="glass-input w-full px-3 py-2 rounded-lg"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Payment Settings */}
        <div className="glass-card rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center mb-6">
            <CreditCard className="w-6 h-6 text-lovejoy-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800">Payment Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Auto Withdraw</p>
                <p className="text-sm text-gray-600">Automatically withdraw earnings when threshold is reached</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoWithdraw}
                  onChange={() => handleToggle('autoWithdraw')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-lovejoy-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-lovejoy-600"></div>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Threshold ($)</label>
              <input
                type="number"
                value={settings.withdrawThreshold}
                onChange={(e) => handleChange('withdrawThreshold', e.target.value)}
                className="glass-input w-full px-3 py-2 rounded-lg"
                min="100"
                step="50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Payment Method</label>
              <select
                value={settings.preferredPaymentMethod}
                onChange={(e) => handleChange('preferredPaymentMethod', e.target.value)}
                className="glass-input w-full px-3 py-2 rounded-lg"
              >
                <option value="bank">Bank Transfer</option>
                <option value="paypal">PayPal</option>
                <option value="stripe">Stripe</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="glass-card rounded-2xl shadow-lg border border-white/20 p-6">
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-lovejoy-600 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800">Appearance & Language</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                className="glass-input w-full px-3 py-2 rounded-lg"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="glass-input w-full px-3 py-2 rounded-lg"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="glass-input w-full px-3 py-2 rounded-lg"
              >
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="primary-button px-6 py-3 rounded-lg font-semibold flex items-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;