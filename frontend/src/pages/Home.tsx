import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, Youtube, Video, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import Footer from '../components/Footer';

const trendingCourses = [
  {
    title: "Machine Learning A-Z™: AI, Python + ChatGPT Bonus [2024]",
    platform: "Udemy",
    description: "Learn to create Machine Learning Algorithms in Python and R. Master Data Science, Machine Learning and ChatGPT with practical exercises.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    rating: 4.8,
    price: "$94.99",
    instructor: "Kirill Eremenko, Hadelin de Ponteves"
  },
  {
    title: "Deep Learning Specialization",
    platform: "Coursera",
    description: "Become a Deep Learning expert. Master Deep Learning and Break into AI with coursework developed by Andrew Ng.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    rating: 4.9,
    price: "Free",
    instructor: "Andrew Ng"
  },
  {
    title: "Complete Python Developer in 2024: Zero to Mastery",
    platform: "YouTube",
    description: "Learn Python from scratch! Perfect for beginners, this comprehensive course covers everything you need to become a Python developer.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    rating: 4.7,
    price: "Free",
    instructor: "Andrei Neagoie"
  },
  {
    title: "The Complete Web Development Bootcamp",
    platform: "Udemy",
    description: "Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps.",
    image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    rating: 4.8,
    price: "$84.99",
    instructor: "Dr. Angela Yu"
  },
  {
    title: "Data Science: R Programming",
    platform: "Coursera",
    description: "Master R programming for data science. Learn data manipulation, visualization, and statistical analysis.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    rating: 4.6,
    price: "Free",
    instructor: "Johns Hopkins University"
  },
  {
    title: "Advanced JavaScript Concepts",
    platform: "YouTube",
    description: "Deep dive into JavaScript. Learn about prototypes, inheritance, closures, and asynchronous programming.",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    rating: 4.9,
    price: "Free",
    instructor: "Kyle Simpson"
  }
];

const CARDS_PER_PAGE = 3;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(trendingCourses.length / CARDS_PER_PAGE);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const currentCourses = trendingCourses.slice(
    currentPage * CARDS_PER_PAGE,
    (currentPage + 1) * CARDS_PER_PAGE
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="gradient-bg min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center pt-20 pb-16"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-6">
              Find Your Perfect Course
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Search across Coursera, Udemy, and YouTube to discover the best learning resources. Compare prices, reviews, and content to make the right choice.
            </p>
            
            <Link
              to="/search"
              className="inline-flex items-center px-8 py-3 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              Start Learning
            </Link>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-xl bg-black/40 backdrop-blur-sm">
                <BookOpen className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Comprehensive Search</h3>
                <p className="text-gray-400">Find the perfect course across multiple platforms in one place</p>
              </div>

              <div className="p-6 rounded-xl bg-black/40 backdrop-blur-sm">
                <Youtube className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Free Resources</h3>
                <p className="text-gray-400">Access high-quality free educational content from YouTube</p>
              </div>

              <div className="p-6 rounded-xl bg-black/40 backdrop-blur-sm">
                <Video className="w-12 h-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Course Tracking</h3>
                <p className="text-gray-400">Save courses and track your learning progress</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trending Courses Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold">Trending Courses</h2>
            <div className="flex gap-2">
              <button
                onClick={prevPage}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPage}
                className="p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentCourses.map((course, index) => (
                  <CourseCard key={index} {...course} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;