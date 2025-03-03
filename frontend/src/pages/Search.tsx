"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaYoutube, FaBook, FaVideo } from "react-icons/fa";
import axios from "axios";

interface Course {
  title: string;
  url: string;
  imageUrl: string;
}

interface CoursesState {
  [key: string]: Course[];
}

interface LoadingState {
  [key: string]: boolean;
}

interface ErrorState {
  [key: string]: string | null;
}

const platforms = [
  { id: "coursera", name: "Coursera", icon: FaBook },
  { id: "udemy", name: "Udemy", icon: FaVideo },
  { id: "youtube", name: "YouTube", icon: FaYoutube },
];

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<
    Record<string, boolean>
  >({
    coursera: true,
    udemy: true,
    youtube: true,
  });
  const [courses, setCourses] = useState<CoursesState>({});
  const [loading, setLoading] = useState<LoadingState>({});
  const [error, setError] = useState<ErrorState>({});
  const [searched, setSearched] = useState<boolean>(false);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) => ({ ...prev, [platform]: !prev[platform] }));
  };

  const fetchCourses = async (): Promise<void> => {
    if (!searchQuery.trim()) return;
    setSearched(true);
    setCourses({});
    setError({});

    const activePlatforms = Object.keys(selectedPlatforms).filter(
      (platform) => selectedPlatforms[platform]
    );

    activePlatforms.forEach(async (platform) => {
      setLoading((prev) => ({ ...prev, [platform]: true }));
      try {
        const response = await axios.get<Course[]>(
          "http://localhost:3000/api/course/scrape",
          {
            params: { platform, query: searchQuery },
            withCredentials: true,
          }
        );
        setCourses((prev) => ({
          ...prev,
          [platform]: response.data.slice(0, 5),
        }));
      } catch (err) {
        setError((prev) => ({
          ...prev,
          [platform]:
            err instanceof Error ? err.message : "Failed to fetch courses",
        }));
      } finally {
        setLoading((prev) => ({ ...prev, [platform]: false }));
      }
    });
  };

  // Skeleton loader for course cards
  const SkeletonLoader = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-black/40 rounded-xl overflow-hidden">
            <div className="w-full h-40 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-black/40 to-gray-700/40"
                animate={{
                  x: ["0%", "100%", "0%"],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "linear",
                }}
              />
            </div>
            <div className="p-6 space-y-3">
              <motion.div
                className="h-5 bg-gray-700/50 rounded-md w-3/4"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="h-4 bg-gray-700/50 rounded-md w-1/2"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1.5,
                  ease: "easeInOut",
                  delay: 0.2,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Platform loading indicator
  const PlatformLoader = ({ name }: { name: string }) => {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-5 h-5 rounded-full bg-orange-600"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="w-5 h-5 rounded-full bg-orange-600"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              ease: "easeInOut",
              delay: 0.2,
            }}
          />
          <motion.div
            className="w-5 h-5 rounded-full bg-orange-600"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1,
              ease: "easeInOut",
              delay: 0.4,
            }}
          />
          <span className="text-gray-300 ml-2">Searching {name}...</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen gradient-bg pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for any course..."
              className="w-full bg-black/40 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {platforms.map(({ id, name, icon: Icon }) => (
              <button
                key={id}
                onClick={() => togglePlatform(id)}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  selectedPlatforms[id] ? "bg-orange-600" : "bg-black/40"
                } transition-colors`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {name}
              </button>
            ))}
            <button
              onClick={fetchCourses}
              className="ml-auto bg-orange-600 px-4 py-2 rounded-lg flex items-center"
            >
              <FaSearch className="w-4 h-4 mr-2" /> Search
            </button>
          </div>
        </motion.div>

        {searched &&
          platforms.map(
            ({ id, name }) =>
              selectedPlatforms[id] && (
                <motion.div
                  key={id}
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    {name} Courses
                    {loading[id] && (
                      <motion.div
                        className="ml-3 w-3 h-3 bg-orange-600 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </h2>

                  {loading[id] && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <PlatformLoader name={name} />
                      <SkeletonLoader />
                    </motion.div>
                  )}

                  {error[id] && (
                    <motion.div
                      className="bg-red-900/30 border border-red-700 rounded-lg p-4 text-center mb-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <p className="text-red-400">{error[id]}</p>
                    </motion.div>
                  )}

                  {!loading[id] && !error[id] && courses[id]?.length === 0 && (
                    <motion.div
                      className="bg-gray-900/30 border border-gray-800 rounded-lg p-8 text-center mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="text-gray-400">
                        No courses found on {name}
                      </p>
                    </motion.div>
                  )}

                  {!loading[id] && courses[id]?.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {courses[id]?.map((course, index) => (
                        <motion.a
                          key={index}
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-black/40 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-orange-900/20 transition-all duration-300 transform hover:-translate-y-1"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            transition: { delay: index * 0.1 },
                          }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="relative w-full h-40">
                            <img
                              src={course.imageUrl || "/placeholder.svg"}
                              alt={course.title}
                              className="w-full h-40 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                          </div>
                          <div className="p-6">
                            <h3 className="text-white font-bold line-clamp-2">
                              {course.title}
                            </h3>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  )}
                </motion.div>
              )
          )}

        {!searched && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="inline-block p-6 rounded-full bg-black/30 border border-gray-800 mb-4">
              <FaSearch className="w-10 h-10 text-gray-500" />
            </div>
            <p className="text-gray-400 text-lg">
              Enter a search term to find courses
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;
  