import React from 'react';
import { motion } from 'framer-motion';
import { BookmarkPlus } from 'lucide-react';

const Wishlist = () => {
  return (
    <div className="min-h-screen gradient-bg pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Your Wishlist</h1>
          <p className="text-gray-400">Keep track of courses you want to take later</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for empty state */}
          <div className="col-span-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl p-12">
            <BookmarkPlus className="w-16 h-16 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No saved courses yet</h3>
            <p className="text-gray-400 text-center">
              Start adding courses to your wishlist by clicking the bookmark icon on any course
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;