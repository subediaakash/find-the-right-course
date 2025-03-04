import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookmarkPlus, Trash2 } from "lucide-react";

interface WishlistItem {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  platform: string;
  createdAt: string;
}

const Wishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/user/wishlist",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch wishlist. Please log in.");
        }

        const result = await response.json();
        setWishlist(result.data.wishlist);
      } catch (error) {
        console.error((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Delete a course from the wishlist
  const handleDelete = async (wishlistId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/user/wishlist/${wishlistId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete course from wishlist.");
      }

      // Remove the deleted item from the state
      setWishlist((prev) => prev.filter((item) => item.id !== wishlistId));
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  // Add course to history when "View Course" is clicked
  const handleViewCourse = async (course: WishlistItem) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/user/history/add",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: course.title,
            url: course.url,
            imageUrl: course.imageUrl,
            platform: course.platform.toUpperCase(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update history.");
      }

      // Open the course URL in a new tab
      window.open(course.url, "_blank");
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <div className="min-h-screen gradient-bg pt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Your Wishlist</h1>
          <p className="text-gray-400">
            Keep track of courses you want to take later
          </p>
        </motion.div>

        {loading ? (
          <p className="text-center text-gray-400">Loading...</p>
        ) : wishlist.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm rounded-xl p-12">
            <BookmarkPlus className="w-16 h-16 text-orange-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No saved courses yet</h3>
            <p className="text-gray-400 text-center">
              Start adding courses to your wishlist by clicking the bookmark
              icon on any course
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{item.platform}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleViewCourse(item)}
                      className="text-orange-500 hover:underline"
                    >
                      View Course
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
