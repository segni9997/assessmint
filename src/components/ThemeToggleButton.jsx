import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleButton = ({ variant = "toggle", className = "" }) => {
  const { isDarkMode, toggleTheme, setTheme } = useTheme();

  if (variant === "dropdown") {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className={`btn btn-ghost btn-circle ${className}`}>
          {isDarkMode ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </div>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 dark:bg-gray-800 rounded-box w-40">
          <li>
            <button onClick={() => setTheme('light')} className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              Light
            </button>
          </li>
          <li>
            <button onClick={() => setTheme('dark')} className="flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Dark
            </button>
          </li>
          <li>
            <button 
              onClick={() => {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setTheme(systemPrefersDark ? 'dark' : 'light');
              }} 
              className="flex items-center gap-2"
            >
              <Monitor className="w-4 h-4" />
              System
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center justify-center w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent-teal-light focus:ring-offset-2 hover:scale-105 ${
        isDarkMode 
          ? 'bg-accent-teal-dark shadow-lg' 
          : 'bg-gray-300 hover:bg-gray-400'
      } ${className}`}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
    >
      {/* Toggle Circle */}
      <span
        className={`absolute inline-block w-5 h-5 bg-white rounded-full shadow-lg transform transition-all duration-300 ${
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

export default ThemeToggleButton;