// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
      {/* Logo and Title */}
      <div className="flex items-center">
        {/* Replace the src with your actual logo path */}
        <img 
          src="/images/placeholder-icon.png" 
          alt="Logo" 
          className="w-8 h-8 mr-2"
        />
        <h1 className="text-xl font-bold">PackRat</h1>
      </div>
      {/* Navigation Menu */}
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="hover:underline">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:underline">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;