import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart, History, User, Search } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed w-full z-10 bg-black bg-opacity-20 backdrop-blur-lg text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-orange-500">
          StudyFinder
        </a>
        <div className="flex items-center space-x-6">
          <a
            href="/wishlist"
            className="flex items-center hover:text-orange-500 transition-colors"
          >
            <Heart className="mr-2" size={20} />
            Wishlist
          </a>
          <a
            href="/history"
            className="flex items-center hover:text-orange-500 transition-colors"
          >
            <History className="mr-2" size={20} />
            Course History
          </a>
          <Button
            variant="outline"
            className="bg-orange-500 hover:bg-orange-600 text-white border-none"
          >
            <Search className="mr-2" size={16} />
            Browse Resources
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full hover:bg-orange-500/20"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-black bg-opacity-90 text-white border-orange-500"
            >
              <DropdownMenuItem>
                <a href="/signin" className="hover:text-orange-500">
                  Sign In
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/signup" className="hover:text-orange-500">
                  Sign Up
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/profile" className="hover:text-orange-500">
                  Profile
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/settings" className="hover:text-orange-500">
                  Settings
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
