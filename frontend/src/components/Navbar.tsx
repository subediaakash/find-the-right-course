"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  BookmarkPlus,
  History,
  User,
  LogOut,
  Flame,
  BookOpen,
} from "lucide-react";
import { useAtom } from "jotai";
import { userAtom, isAuthenticatedAtom } from "../auth/atoms";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => {
    if (isOpen) setIsOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-orange-500 font-semibold"
      : "text-gray-300 hover:text-orange-400";
  };

  return (
    <nav
      className={`${
        scrolled
          ? "bg-black/95 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-sm"
      } sticky top-0 w-full z-50 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center group"
              onClick={closeMobileMenu}
            >
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-2 rounded-lg transform group-hover:scale-110 transition-all duration-300 shadow-lg shadow-orange-500/20">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-white tracking-tight">
                Course
                <span className="text-orange-500 font-extrabold">Hub</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              <Link
                to="/search"
                className={`${isActive(
                  "/search"
                )} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105`}
              >
                <div className="flex items-center">
                  <Search className="h-4 w-4 mr-1.5" />
                  <span>Search</span>
                </div>
              </Link>
              <Link
                to="/wishlist"
                className={`${isActive(
                  "/wishlist"
                )} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105`}
              >
                <div className="flex items-center">
                  <BookmarkPlus className="h-4 w-4 mr-1.5" />
                  <span>Wishlist</span>
                </div>
              </Link>
              <Link
                to="/history"
                className={`${isActive(
                  "/history"
                )} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105`}
              >
                <div className="flex items-center">
                  <History className="h-4 w-4 mr-1.5" />
                  <span>History</span>
                </div>
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center space-x-4 ml-2">
                  <Link
                    to="/profile"
                    className={`${isActive(
                      "/profile"
                    )} px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:scale-105`}
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-800 p-1 rounded-full">
                        <User className="h-4 w-4 text-orange-400" />
                      </div>
                      <span className="ml-1.5">{user?.name || "Profile"}</span>
                    </div>
                  </Link>
                  <Link
                    to="/logout"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-all duration-200 flex items-center shadow-md hover:shadow-gray-700/30"
                  >
                    <LogOut className="h-4 w-4 mr-1.5" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-5 py-2 rounded-md text-sm font-medium hover:from-orange-700 hover:to-orange-600 shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none transition-colors duration-200"
              aria-expanded={isOpen}
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-xl shadow-xl border-t border-gray-700">
            <Link
              to="/search"
              className={`${isActive(
                "/search"
              )}  px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 flex items-center`}
              onClick={closeMobileMenu}
            >
              <div className="bg-gray-700 p-2 rounded-lg mr-3">
                <Search className="h-5 w-5 text-orange-400" />
              </div>
              Search
            </Link>
            <Link
              to="/wishlist"
              className={`${isActive(
                "/wishlist"
              )}  px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 flex items-center`}
              onClick={closeMobileMenu}
            >
              <div className="bg-gray-700 p-2 rounded-lg mr-3">
                <BookmarkPlus className="h-5 w-5 text-orange-400" />
              </div>
              Wishlist
            </Link>
            <Link
              to="/history"
              className={`${isActive(
                "/history"
              )} px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 flex items-center`}
              onClick={closeMobileMenu}
            >
              <div className="bg-gray-700 p-2 rounded-lg mr-3">
                <History className="h-5 w-5 text-orange-400" />
              </div>
              History
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className={`${isActive(
                    "/profile"
                  )}  px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 flex items-center`}
                  onClick={closeMobileMenu}
                >
                  <div className="bg-gray-700 p-2 rounded-lg mr-3">
                    <User className="h-5 w-5 text-orange-400" />
                  </div>
                  {user?.name || "Profile"}
                </Link>
                <div className="pt-2 pb-1">
                  <Link
                    to="/logout"
                    className=" w-full bg-gray-700 text-white px-3 py-3 rounded-md text-base font-medium hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center shadow-md"
                    onClick={closeMobileMenu}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </Link>
                </div>
              </>
            ) : (
              <div className="pt-2 pb-1">
                <Link
                  to="/signin"
                  className=" w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white px-3 py-3 rounded-md text-base font-medium hover:from-orange-700 hover:to-orange-600 transition-all duration-200 flex items-center justify-center shadow-lg"
                  onClick={closeMobileMenu}
                >
                  <Flame className="h-5 w-5 mr-2" />
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
