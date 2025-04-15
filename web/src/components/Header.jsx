import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header({ handleLogout, isAuthenticated, userEmail, username }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="text-stone-600 py-2 px-8 flex items-center justify-between border-b border-stone-300">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/icon.svg" 
            alt="Logo" 
            className="w-8 h-8 mr-2"
          />
          <h1 className="text-xl">PackRat</h1>
        </Link>
      </div>
      
      {/* USER INFO with Dropdown */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-stone-200 transition-colors"
            >
              <span className="text-sm font-medium">
                Welcome Back: <strong>{username}</strong>
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                <div className="px-4 py-2 text-sm text-stone-500 border-b border-stone-200">
                  Signed in as <span className="font-medium text-stone-700">{userEmail}</span>
                </div>
                <button 
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-stone-100"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link 
              to="/sign-in"
              className="px-4 py-2 text-sm bg-stone-200 hover:bg-stone-300 rounded-md transition-colors"
            >
              Log In
            </Link>
            <Link 
              to="/sign-up"
              className="px-4 py-2 text-sm text-white bg-stone-600 hover:bg-stone-700 rounded-md transition-colors"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;