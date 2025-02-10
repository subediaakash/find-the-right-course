import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Youtube, BookOpen, Mail, Twitter, Github, Video } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <Search className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold">CourseHub</span>
            </Link>
            <p className="text-gray-400">
              Find and compare courses from top platforms to accelerate your learning journey.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Platforms</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>Coursera</span>
              </li>
              <li className="flex items-center">
                <Video className="w-4 h-4 mr-2" />
                <span>Udemy</span>
              </li>
              <li className="flex items-center">
                <Youtube className="w-4 h-4 mr-2" />
                <span>YouTube</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/search" className="hover:text-orange-500">Search</Link></li>
              <li><Link to="/wishlist" className="hover:text-orange-500">Wishlist</Link></li>
              <li><Link to="/history" className="hover:text-orange-500">History</Link></li>
              <li><Link to="/profile" className="hover:text-orange-500">Profile</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-500">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CourseHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;