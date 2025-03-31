// src/components/Header.jsx
import React from 'react';

function Header() {
  return (
    <header className=" text-stone-600 p-4 flex items-center justify-between border-b border-stone-300">
      {/* Logo and Title */}
      <div className="flex items-center ">
        {/* Replace the src with your actual logo path */}
        <img 
          src="../public/icon.svg" 
          alt="Logo" 
          className="w-8 h-8 mr-2"
        />
        <h1 className="text-xl">PackRat</h1>
      </div>
      {/* USER INFO */}
      <div>
        <p className="text-sm">Welcome Back: <strong>Shredder</strong></p>
      </div>

    </header>
  );
}

export default Header;