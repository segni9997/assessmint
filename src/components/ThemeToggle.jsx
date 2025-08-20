import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-accent-teal-light focus:ring-offset-2 ${
        isDarkMode 
          ? 'bg-accent-teal-dark' 
          : 'bg-gray-300'
      } ${className}`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <span
        className={`absolute inline-block w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
          isDarkMode ? 'translate-x-3' : '-translate-x-3'
        }`}
      >
        {/* Icon inside the circle */}
        <span className="absolute inset-0 flex items-center justify-center">
          {isDarkMode ? (
            <Moon className="w-3 h-3 text-accent-teal-dark" />
          ) : (
            <Sun className="w-3 h-3 text-yellow-500" />
          )}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;