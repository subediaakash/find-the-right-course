import React from 'react';
import { BookmarkPlus, Star } from 'lucide-react';

interface CourseCardProps {
  title: string;
  platform: string;
  description: string;
  image: string;
  rating: number;
  price: string;
  instructor: string;
}

const CourseCard = ({ title, platform, description, image, rating, price, instructor }: CourseCardProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <button className="p-2 bg-black/50 backdrop-blur-sm rounded-full hover:bg-black/70 transition-colors">
            <BookmarkPlus className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium">{platform}</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>
          <span className="text-orange-500 font-semibold">{price}</span>
        </div>
        <div className="mt-2 text-sm text-gray-400">
          by {instructor}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;