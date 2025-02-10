import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, Filter, Youtube, BookOpen, Video } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState({
    coursera: true,
    udemy: true,
    youtube: true
  });

  return (
    <div className="min-h-screen gradient-bg pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any course..."
              className="w-full bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedPlatforms(prev => ({ ...prev, coursera: !prev.coursera }))}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedPlatforms.coursera ? 'bg-orange-600' : 'bg-black/40'
              } transition-colors`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Coursera
            </button>
            <button
              onClick={() => setSelectedPlatforms(prev => ({ ...prev, udemy: !prev.udemy }))}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedPlatforms.udemy ? 'bg-orange-600' : 'bg-black/40'
              } transition-colors`}
            >
              <Video className="w-4 h-4 mr-2" />
              Udemy
            </button>
            <button
              onClick={() => setSelectedPlatforms(prev => ({ ...prev, youtube: !prev.youtube }))}
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedPlatforms.youtube ? 'bg-orange-600' : 'bg-black/40'
              } transition-colors`}
            >
              <Youtube className="w-4 h-4 mr-2" />
              YouTube
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Course cards will be rendered here */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6">
            <p className="text-gray-400 text-center">
              Enter a search term to find courses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;