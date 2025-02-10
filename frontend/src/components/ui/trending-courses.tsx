import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    id: 1,
    title: "Machine Learning Fundamentals",
    instructor: "Dr. Sarah Johnson",
    description:
      "Master the basics of machine learning algorithms and their applications.",
    price: 79.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 2,
    title: "Web Development Bootcamp",
    instructor: "Michael Chen",
    description:
      "Comprehensive course covering HTML, CSS, JavaScript, React, and Node.js.",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Data Science with Python",
    instructor: "Emily Rodriguez",
    description: "Learn to analyze and visualize data using Python libraries.",
    price: 69.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "UX/UI Design Masterclass",
    instructor: "Alex Thompson",
    description:
      "Create stunning user interfaces and improve user experiences.",
    price: 99.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "Blockchain and Cryptocurrency",
    instructor: "Satoshi Nakamoto",
    description:
      "Dive into the world of blockchain technology and cryptocurrencies.",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "Digital Marketing Strategies",
    instructor: "Laura Martinez",
    description:
      "Learn effective digital marketing techniques for business growth.",
    price: 74.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 7,
    title: "iOS App Development with Swift",
    instructor: "David Kim",
    description: "Build powerful iOS applications using Swift and Xcode.",
    price: 94.99,
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 8,
    title: "Artificial Intelligence Ethics",
    instructor: "Prof. Amelia Wong",
    description:
      "Explore the ethical implications of AI in society and business.",
    price: 84.99,
    image: "/placeholder.svg?height=200&width=300",
  },
];
export function TrendingCourses() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsToShow(1);
      } else if (window.innerWidth < 1024) {
        setCardsToShow(2);
      } else if (window.innerWidth < 1280) {
        setCardsToShow(3);
      } else {
        setCardsToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + cardsToShow) % courses.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - cardsToShow + courses.length) % courses.length
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-5xl font-bold py-8">Trending Courses</p>
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
            }}
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className={`w-full flex-shrink-0 px-2 transition-transform duration-300 ease-in-out`}
                style={{ flex: `0 0 ${100 / cardsToShow}%` }}
              >
                <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg h-full flex flex-col">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-lg font-bold mb-2 text-orange-500 line-clamp-2">
                        {course.title}
                      </h2>
                      <p className="text-sm text-gray-400 mb-2">
                        Instructor: {course.instructor}
                      </p>
                      <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                        {course.description}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-lg font-bold text-orange-500">
                        ${course.price.toFixed(2)}
                      </span>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm py-1">
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons with z-index to ensure they're above cards */}
        <Button
          onClick={prevSlide}
          className="absolute top-1/2 -left-4 z-10 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
        >
          <ChevronLeft size={24} />
        </Button>
        <Button
          onClick={nextSlide}
          className="absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
        >
          <ChevronRight size={24} />
        </Button>
      </div>
    </div>
  );
}
