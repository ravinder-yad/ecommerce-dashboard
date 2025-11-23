import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiChevronDown,
  FiUser,
  FiSettings,
  FiLogOut
} from 'react-icons/fi';

const Topbar = ({ setIsMobileOpen }) => {
  const { isDark } = useTheme();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topbarBg = isDark 
    ? 'bg-slate-900/80' 
    : 'bg-white/80';
  const borderColor = isDark ? 'border-slate-800' : 'border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const searchBg = isDark ? 'bg-slate-800' : 'bg-gray-50';
  const searchBorder = isDark ? 'border-slate-700' : 'border-gray-300';
  const placeholderColor = isDark ? 'placeholder-slate-400' : 'placeholder-gray-500';
  const buttonBg = isDark ? 'bg-slate-800' : 'bg-gray-100';
  const buttonBorder = isDark ? 'border-slate-700' : 'border-gray-300';
  const buttonHover = isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-200';
  const dropdownBg = isDark ? 'bg-slate-800' : 'bg-white';
  const dropdownBorder = isDark ? 'border-slate-700' : 'border-gray-300';
  const dropdownText = isDark ? 'text-slate-300' : 'text-gray-700';
  const dropdownHover = isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100';
  const breadcrumbText = isDark ? 'text-slate-400' : 'text-gray-500';

  return (
    <div className={`
      sticky top-0 z-30
      ${topbarBg} backdrop-blur-sm border-b ${borderColor}
      transition-all duration-300
      ${isScrolled ? 'shadow-lg' : 'shadow-sm'}
      px-3 md:px-4 py-2 md:py-3
    `}>
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className={`md:hidden p-1.5 md:p-2 rounded-lg ${buttonBg} border ${buttonBorder} ${buttonHover} transition-colors`}
          >
            <FiMenu className={`w-4 h-4 md:w-5 md:h-5 ${textColor}`} />
          </button>

          {/* Page Title & Breadcrumbs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 md:sm:space-x-4">
            <h1 className={`${textColor} font-bold text-lg md:text-xl`}>Dashboard</h1>
            <div className={`hidden sm:flex items-center space-x-1 text-xs md:text-sm ${breadcrumbText}`}>
              <span>Home</span>
              <span>/</span>
              <span className={textColor}>Dashboard</span>
            </div>
          </div>
        </div>

        {/* Middle - Search Bar */}
        <div className="flex-1 max-w-2xl mx-2 md:mx-4 hidden lg:block">
          <div className="relative">
            <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
              <FiSearch className={`w-4 h-4 md:w-5 md:h-5 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              placeholder="Search orders, customers, products..."
              className={`w-full pl-9 md:pl-10 pr-3 md:pr-4 py-1.5 md:py-2 ${searchBg} border ${searchBorder} rounded-lg ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm md:text-base`}
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-1 md:space-x-3">
          {/* Mobile Search Button */}
          <button className={`lg:hidden p-1.5 md:p-2 rounded-lg ${buttonBg} border ${buttonBorder} ${buttonHover} transition-colors`}>
            <FiSearch className={`w-4 h-4 md:w-5 md:h-5 ${textColor}`} />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <button className={`relative p-1.5 md:p-2 rounded-lg ${buttonBg} border ${buttonBorder} ${buttonHover} transition-colors`}>
            <FiBell className={`w-4 h-4 md:w-5 md:h-5 ${textColor}`} />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full border border-white dark:border-slate-900 animate-pulse"></div>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className={`flex items-center space-x-1 md:space-x-3 p-1 md:p-2 rounded-lg ${buttonBg} border ${buttonBorder} ${buttonHover} transition-colors`}
            >
              <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs md:text-sm font-bold">RY</span>
              </div>
              <div className="text-left hidden xl:block">
                <div className={`${textColor} text-sm font-medium`}>Ravinder</div>
                <div className={`${isDark ? 'text-slate-400' : 'text-gray-500'} text-xs`}>Admin</div>
              </div>
              <FiChevronDown className={`w-3 h-3 md:w-4 md:h-4 ${isDark ? 'text-slate-400' : 'text-gray-500'} transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className={`absolute right-0 top-full mt-1 md:mt-2 w-40 md:w-48 ${dropdownBg} border ${dropdownBorder} rounded-lg shadow-lg py-1 z-40 animate-in fade-in duration-200`}>
                <a href="#" className={`flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm ${dropdownText} ${dropdownHover} ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                  <FiUser className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Profile</span>
                </a>
                <a href="#" className={`flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm ${dropdownText} ${dropdownHover} ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                  <FiSettings className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Settings</span>
                </a>
                <div className="border-t border-gray-200 dark:border-slate-700 my-1"></div>
                <a href="#" className={`flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm ${dropdownText} ${dropdownHover} ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                  <FiLogOut className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden mt-2">
        <div className="relative">
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none`}>
            <FiSearch className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-gray-400'}`} />
          </div>
          <input
            type="text"
            placeholder="Search orders, customers, products..."
            className={`w-full pl-9 pr-3 py-1.5 ${searchBg} border ${searchBorder} rounded-lg ${textColor} ${placeholderColor} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm`}
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;