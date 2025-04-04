import { useEffect, useState, useRef, useCallback } from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { User } from '../types/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../../hooks/useRedux';
import toast from 'react-hot-toast';

const selectCurrentUser = (state: RootState): User | null => state.auth.user;

export function Navigation() {
  const [showProfile, setShowProfile] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const currentUser: User | null = useSelector(selectCurrentUser);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userName = currentUser?.name || "Default User";
  const userEmail = currentUser?.email || "";
  const profileImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}`;

  // Toggle profile dropdown
  const handleProfileToggle = useCallback(() => {
    setShowProfile((prev) => !prev);
  }, []);

  // Hide dropdown on "Escape" press
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowProfile(false);
    }
  }, []);

  useEffect(() => {
    if (showProfile) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [showProfile, handleKeyDown]);

  // Hide dropdown on mouse leave
  const handleMouseLeave = useCallback(() => {
    setShowProfile(false);
  }, []);

  useEffect(() => {
    if (!showProfile) return;
    const dropdownElement = dropdownRef.current;
    if (dropdownElement) {
      dropdownElement.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        dropdownElement.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [showProfile, handleMouseLeave]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error('Logout failed:', error);
    }
  }, [logout, navigate]);

  return (
    <header
      className="
        fixed top-0 z-50 h-16 
        w-full 
        bg-[rgb(var(--color-rich-black))] shadow-glow 
        flex items-center justify-between 
        px-4
      "
    >
      {/* Left side: Logo / Brand */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-[rgb(var(--color-mikado-yellow))] bg-clip-text text-transparent">
          SStockSense<span className="text-[rgb(var(--color-mikado-yellow))]">.</span>
        </h1>
      </div>

      {/* Right side: User Profile / Dropdown */}
      <div className="relative">
        <button
          onClick={handleProfileToggle}
          className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10 dark:hover:bg-gray-800/50 transition-all duration-200 group"
        >
          {/* User Avatar */}
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          {/* Username (hidden on smaller screens) */}
          <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
            {userName}
          </span>
        </button>

        {/* Profile Dropdown */}
        {showProfile && (
          <div
            ref={dropdownRef}
            className="
              absolute right-0 mt-2 w-48 
              bg-[rgb(var(--color-rich-black))] rounded-md shadow-lg 
              animate-slide-up
            "
          >
            <div className="p-3 border-b border-white/10 dark:border-gray-800/90">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {userName}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userEmail}
              </p>
            </div>
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="
                  w-full flex items-center px-3 py-2 text-sm 
                  text-red-600 dark:text-red-400 rounded-md 
                  hover:bg-white/10 dark:hover:bg-gray-800/50 
                  transition-all duration-200
                "
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
