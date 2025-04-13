import React from 'react';
import Ballpit from './Ballpit';

function BallpitBackground({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-8 relative">
      {/* Ballpit background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Ballpit
          count={200}
          gravity={0.7}
          friction={0.8}
          wallBounce={0.95}
          followCursor={true}
          colors={['#805AD5', '#4FD1C5', '#F6AD55']} // PackRat brand colors
        />
      </div>
      
      {/* Semi-transparent overlay for better contrast */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-10"></div>
      
      {/* Content container */}
      <div className="z-20 w-full max-w-md relative">
        {children}
      </div>
    </div>
  );
}

export default BallpitBackground;