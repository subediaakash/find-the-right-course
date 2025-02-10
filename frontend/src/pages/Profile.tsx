import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Bell, Trash2 } from 'lucide-react';

const Profile = () => {
  return (
    <div className="min-h-screen gradient-bg pt-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-sm rounded-xl p-8"
        >
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  className="w-full bg-black/40 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  className="w-full bg-black/40 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Change Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  className="w-full bg-black/40 border border-gray-700 rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="New password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-t border-gray-700">
              <div className="flex items-center">
                <Bell className="h-5 w-5 text-gray-400" />
                <span className="ml-2">Email Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/25 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
              </label>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <button className="flex items-center text-red-500 hover:text-red-400">
                <Trash2 className="h-5 w-5 mr-2" />
                Delete Account
              </button>
            </div>

            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                Cancel
              </button>
              <button className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;