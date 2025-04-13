import React from 'react';
import { Link } from 'react-router-dom';

function Header({ handleLogout, isAuthenticated, userEmail }) {
  return (
    <header className="text-stone-600 p-4 flex items-center justify-between border-b border-stone-300">
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
      
      {/* USER INFO */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <p className="text-sm">Welcome Back: <strong>{userEmail}</strong></p>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm bg-stone-200 hover:bg-stone-300 rounded-md transition-colors"
            >
              Log Out
            </button>
          </>
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