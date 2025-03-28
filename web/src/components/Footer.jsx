// src/components/Footer.jsx
import React from 'react';

function Footer() {
  return (
    <footer className=" text-black p-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} PackRat. Coded for my own sanity.
      </p>
    </footer>
  );
}

export default Footer;