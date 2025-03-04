import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Key, Bell, Trash2 } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/profile", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setUserData(data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg pt-24 px-4 flex justify-center items-center">
        <div className="animate-pulse text-2xl text-orange-500">
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-12">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                {userData?.name}
              </h1>
              <p className="text-gray-400 mt-2">Manage your account settings</p>
            </div>
            <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-orange-500" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-black/20 p-6 rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-orange-500" />
                Personal Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Full Name</label>
                  <div className="flex items-center bg-black/30 px-4 py-3 rounded-lg border border-white/10">
                    <input
                      type="text"
                      value={userData?.name || ""}
                      readOnly
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Email Address</label>
                  <div className="flex items-center bg-black/30 px-4 py-3 rounded-lg border border-white/10">
                    <Mail className="w-5 h-5 mr-2 text-gray-400" />
                    <input
                      type="email"
                      value={userData?.email || ""}
                      readOnly
                      className="w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/20 p-6 rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Key className="w-5 h-5 mr-2 text-orange-500" />
                Account Details
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">
                    Account Created
                  </label>
                  <div className="flex items-center bg-black/30 px-4 py-3 rounded-lg border border-white/10">
                    <Calendar className="w-5 h-5 mr-2 text-gray-400" />
                    <span>
                      {new Date(userData?.createdAt || "").toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Account ID</label>
                  <div className="flex items-center bg-black/30 px-4 py-3 rounded-lg border border-white/10">
                    <code className="text-gray-400 text-sm font-mono">
                      {userData?.id}
                    </code>
                    <button
                      className="ml-auto text-orange-500 hover:text-orange-400 text-sm"
                      onClick={() =>
                        navigator.clipboard.writeText(userData?.id || "")
                      }
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/20 p-6 rounded-xl border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-2 text-orange-500" />
                  <span className="text-gray-300">Email Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-12 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-6 peer-checked:bg-orange-500 after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                </label>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="border border-red-500/30 rounded-xl p-6 bg-red-500/10">
              <h2 className="text-xl font-semibold mb-4 text-red-400">
                Danger Zone
              </h2>
              <button className="flex items-center text-red-400 hover:text-red-300">
                <Trash2 className="w-5 h-5 mr-2" />
                Delete Account Permanently
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
