import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const Layout = ({ children }) => {
  const { isDark } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className={`
      min-h-screen
      ${isDark 
        ? 'bg-slate-950 text-white' 
        : 'bg-gray-50 text-gray-900'
      }
      transition-colors duration-200
    `}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar 
          isMobileOpen={isMobileOpen} 
          setIsMobileOpen={setIsMobileOpen} 
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-0 min-h-0">
          {/* Topbar */}
          <Topbar setIsMobileOpen={setIsMobileOpen} />
          
          {/* Page Content - Scrollable */}
          <main className="flex-1 overflow-auto">
            <div className="p-3 md:p-4 lg:p-6">
              <div className="max-w-7xl mx-auto w-full">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;