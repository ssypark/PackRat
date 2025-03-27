// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} PackRat. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;