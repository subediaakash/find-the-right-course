import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, BookmarkPlus, History, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/95 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Search className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-white">CourseHub</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/search" className="text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
                Search
              </Link>
              <Link to="/wishlist" className="text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
                Wishlist
              </Link>
              <Link to="/history" className="text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
                History
              </Link>
              <Link to="/profile" className="text-gray-300 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium">
                Profile
              </Link>
              <Link to="/auth" className="bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-orange-700">
                Sign In
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/search"
              className="text-gray-300 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Search
            </Link>
            <Link
              to="/wishlist"
              className="text-gray-300 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Wishlist
            </Link>
            <Link
              to="/history"
              className="text-gray-300 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              History
            </Link>
            <Link
              to="/profile"
              className="text-gray-300 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
            >
              Profile
            </Link>
            <Link
              to="/auth"
              className="bg-orange-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-orange-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;