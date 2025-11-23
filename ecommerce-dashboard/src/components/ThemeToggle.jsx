import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  const buttonBg = isDark ? 'bg-slate-900' : 'bg-gray-100';
  const buttonBorder = isDark ? 'border-slate-700' : 'border-gray-300';
  const buttonHover = isDark ? 'hover:bg-slate-800' : 'hover:bg-gray-200';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg ${buttonBg} border ${buttonBorder} ${buttonHover} transition-colors duration-200`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <FiSun className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
      ) : (
        <FiMoon className="w-4 h-4 md:w-5 md:h-5 text-slate-700" />
      )}
    </button>
  );
};

export default ThemeToggle;