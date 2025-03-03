import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaYoutube, FaBook, FaVideo } from "react-icons/fa";
import axios from "axios";

interface Course {
  title: string;
  instructor: string;
}

interface CourseData {
  coursera: Course[];
  udemy: Course[];
  youtube: Course[];
}

interface PlatformState {
  coursera: boolean;
  udemy: boolean;
  youtube: boolean;
}

interface LoadingState {
  coursera: boolean;
  udemy: boolean;
  youtube: boolean;
}

interface ErrorState {
  coursera: string | null;
  udemy: string | null;
  youtube: string | null;
}

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformState>({
    coursera: true,
    udemy: true,
    youtube: true,
  });
  const [courses, setCourses] = useState<CourseData>({
    coursera: [],
    udemy: [],
    youtube: [],
  });
  const [loading, setLoading] = useState<LoadingState>({
    coursera: false,
    udemy: false,
    youtube: false,
  });
  const [error, setError] = useState<ErrorState>({
    coursera: null,
    udemy: null,
    youtube: null,
  });

  const fetchCourses = async (): Promise<void> => {
    setCourses({
      coursera: [],
      udemy: [],
      youtube: [],
    });

    setError({
      coursera: null,
      udemy: null,
      youtube: null,
    });

    if (!searchQuery.trim()) return;

    const platforms = Object.keys(selectedPlatforms).filter(
      (platform) => selectedPlatforms[platform as keyof PlatformState]
    );

    platforms.forEach(async (platform) => {
      setLoading((prev) => ({
        ...prev,
        [platform]: true,
      }));

      try {
        const response = await axios.get<Course[]>(
          "http://localhost:3000/api/course/scrape",
          {
            params: {
              platform,
              query: searchQuery,
            },
            withCredentials: true,
          }
        );

        setCourses(
          (prev) =>
            ({
              ...prev,
              [platform]: response.data,
            } as CourseData)
        );
      } catch (err) {
        console.error(`Error fetching ${platform} courses:`, err);
        setError(
          (prev) =>
            ({
              ...prev,
              [platform]:
                err instanceof Error ? err.message : "Failed to fetch courses",
            } as ErrorState)
        );
      } finally {
        setLoading((prev) => ({
          ...prev,
          [platform]: false,
        }));
      }
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      fetchCourses();
    }
  };

  useEffect(() => {
    if (searchQuery.trim()) {
      fetchCourses();
    }
  }, [selectedPlatforms]); 

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
              onKeyPress={handleKeyPress}
              placeholder="Search for any course..."
              className="w-full bg-black/40 backdrop-blur-sm border border-gray-700 rounded-lg py-3 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() =>
                setSelectedPlatforms((prev) => ({
                  ...prev,
                  coursera: !prev.coursera,
                }))
              }
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedPlatforms.coursera ? "bg-orange-600" : "bg-black/40"
              } transition-colors`}
            >
              <FaBook className="w-4 h-4 mr-2" />
              Coursera
            </button>
            <button
              onClick={() =>
                setSelectedPlatforms((prev) => ({
                  ...prev,
                  udemy: !prev.udemy,
                }))
              }
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedPlatforms.udemy ? "bg-orange-600" : "bg-black/40"
              } transition-colors`}
            >
              <FaVideo className="w-4 h-4 mr-2" />
              Udemy
            </button>
            <button
              onClick={() =>
                setSelectedPlatforms((prev) => ({
                  ...prev,
                  youtube: !prev.youtube,
                }))
              }
              className={`flex items-center px-4 py-2 rounded-lg ${
                selectedPlatforms.youtube ? "bg-orange-600" : "bg-black/40"
              } transition-colors`}
            >
              <FaYoutube className="w-4 h-4 mr-2" />
              YouTube
            </button>
            <button
              onClick={fetchCourses}
              className="ml-auto bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg flex items-center"
            >
              <FaSearch className="w-4 h-4 mr-2" />
              Search
            </button>
          </div>
        </motion.div>

        {Object.keys(selectedPlatforms)
          .filter(
            (platform) => selectedPlatforms[platform as keyof PlatformState]
          )
          .map((platform) => (
            <div key={platform} className="mb-8">
              <h2 className="text-xl font-bold text-white mb-4 capitalize">
                {platform} Courses
              </h2>

              {loading[platform as keyof LoadingState] && (
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-gray-400 text-center">
                    Loading {platform} courses...
                  </p>
                </div>
              )}

              {error[platform as keyof ErrorState] && (
                <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-red-500">
                  <p className="text-red-400 text-center">
                    {error[platform as keyof ErrorState]}
                  </p>
                </div>
              )}

              {!loading[platform as keyof LoadingState] &&
                !error[platform as keyof ErrorState] &&
                courses[platform as keyof CourseData].length === 0 &&
                searchQuery.trim() !== "" && (
                  <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6">
                    <p className="text-gray-400 text-center">
                      No courses found on {platform}
                    </p>
                  </div>
                )}

              {!loading[platform as keyof LoadingState] &&
                courses[platform as keyof CourseData].length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses[platform as keyof CourseData].map(
                      (course, index) => (
                        <div
                          key={index}
                          className="bg-black/40 backdrop-blur-sm rounded-xl p-6"
                        >
                          <h3 className="text-white font-bold">
                            {course.title}
                          </h3>
                          <p className="text-gray-300">{course.instructor}</p>
                        </div>
                      )
                    )}
                  </div>
                )}
            </div>
          ))}

        {searchQuery.trim() === "" && (
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6">
            <p className="text-gray-400 text-center">
              Enter a search term to find courses
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
