import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiFolder,
  FiTag,
  FiStar,
  FiBarChart2,
  FiSettings,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX
} from 'react-icons/fi';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const menuItems = [
    { name: 'Dashboard', icon: FiHome, path: '/dashboard', section: 'Main' },
    { name: 'Products', icon: FiPackage, path: '/products', section: 'Main' },
    { name: 'Orders', icon: FiShoppingCart, path: '/orders', section: 'Main' },
    { name: 'Customers', icon: FiUsers, path: '/customers', section: 'Main' },
    { name: 'Categories', icon: FiFolder, path: '/categories', section: 'Catalog' },
    { name: 'Coupons', icon: FiTag, path: '/coupons', section: 'Catalog' },
    { name: 'Reviews', icon: FiStar, path: '/reviews', section: 'Catalog' },
    { name: 'Analytics', icon: FiBarChart2, path: '/analytics', section: 'Analytics' },
    { name: 'Settings', icon: FiSettings, path: '/settings', section: 'Settings' },
    { name: 'Admin Users', icon: FiUser, path: '/admin-users', section: 'Settings' },
  ];

  const sections = {
    'Main': menuItems.filter(item => item.section === 'Main'),
    'Catalog': menuItems.filter(item => item.section === 'Catalog'),
    'Analytics': menuItems.filter(item => item.section === 'Analytics'),
    'Settings': menuItems.filter(item => item.section === 'Settings'),
  };

  const handleItemClick = (item) => {
    setActiveItem(item.path);
    navigate(item.path);
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out...');
    // navigate('/login');
  };

  const sidebarBg = isDark ? 'bg-slate-900' : 'bg-white';
  const borderColor = isDark ? 'border-slate-800' : 'border-gray-200';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const sectionTextColor = isDark ? 'text-slate-400' : 'text-gray-500';
  const hoverBg = isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-100';
  const iconColor = isDark ? 'text-gray-300' : 'text-gray-600';

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:static inset-y-0 left-0 z-50
        w-64 ${sidebarBg} border-r ${borderColor}
        transform transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col h-screen
      `}>
        {/* Logo Section */}
        <div className={`p-4 md:p-6 border-b ${borderColor} flex-shrink-0`}>
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => {
                navigate('/dashboard');
                setActiveItem('/dashboard');
              }}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FiShoppingCart className="text-white text-sm md:text-lg" />
              </div>
              <div className="hidden sm:block">
                <h1 className={`${textColor} font-bold text-base md:text-lg`}>Ecom Admin</h1>
                <p className={`${sectionTextColor} text-xs md:text-sm`}>Control Panel</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700"
            >
              <FiX className={`w-4 h-4 ${textColor}`} />
            </button>
          </div>
        </div>

        {/* Navigation Items - Scrollable */}
        <div className="flex-1 overflow-y-auto py-3 md:py-4 px-2 md:px-3">
          {Object.entries(sections).map(([sectionName, items]) => (
            <div key={sectionName} className="mb-4 md:mb-6">
              <h3 className={`${sectionTextColor} text-xs font-semibold uppercase tracking-wider px-2 md:px-3 mb-2`}>
                {sectionName}
              </h3>
              <div className="space-y-1">
                {items.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = activeItem === item.path;
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleItemClick(item)}
                      className={`
                        w-full flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-2 md:py-3 rounded-lg text-left transition-all duration-200
                        ${isActive
                          ? 'bg-blue-600 text-white shadow-lg'
                          : `${textColor} ${hoverBg} hover:text-gray-900 dark:hover:text-white`
                        }
                      `}
                    >
                      <IconComponent className={`text-base md:text-lg ${isActive ? 'text-white' : iconColor}`} />
                      <span className="font-medium text-sm md:text-base">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button - Fixed at bottom */}
        <div className={`p-3 md:p-4 border-t ${borderColor} flex-shrink-0`}>
          <button 
            onClick={handleLogout}
            className={`
              w-full flex items-center space-x-2 md:space-x-3 px-2 md:px-3 py-2 md:py-3 rounded-lg
              ${textColor} ${hoverBg} hover:text-gray-900 dark:hover:text-white
              transition-all duration-200
            `}
          >
            <FiLogOut className={`text-base md:text-lg ${iconColor}`} />
            <span className="font-medium text-sm md:text-base">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;