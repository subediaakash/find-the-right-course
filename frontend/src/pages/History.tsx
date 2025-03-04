import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon } from "lucide-react";

interface Course {
  id: string;
  title: string;
  platform: string;
  imageUrl: string;
  url: string;
}

const History: React.FC = () => {
  const [history, setHistory] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/history", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch history. Please log in.");
        }

        const result = await response.json();
        // Ensure the fetched data matches the Course interface
        const fetchedHistory: Course[] =
          result?.data?.history?.slice(-10) ?? [];
        setHistory(fetchedHistory);
      } catch (error) {
        console.error((error as Error).message); // Cast error to Error type
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#20120f] to-black text-white px-6 md:px-16 py-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold">Your History</h2>
        <p className="text-gray-400 mt-2">Track your course viewing history</p>
      </div>

      <div className="max-w-4xl mx-auto mt-10">
        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : history.length === 0 ? (
          <div className="bg-[#20120f] text-center py-10 px-6 rounded-xl shadow-lg">
            <HistoryIcon className="w-12 h-12 mx-auto text-orange-500" />
            <h3 className="text-lg font-medium mt-2">No viewing history</h3>
            <p className="text-gray-400">
              Your course viewing history will appear here
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {history.map((course: Course) => (
              <motion.div
                key={course.id}
                className="bg-[#1a1a1a] p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex items-center gap-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-24 h-24 rounded-md object-cover"
                />
                <div>
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-orange-400 text-sm mt-1">
                      {course.platform}
                    </p>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
