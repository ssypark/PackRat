import React, { useState } from "react";

function PlusOrb({ onAddItem }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  return (
    <div
      onClick={onAddItem}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white overflow-visible cursor-pointer flex items-center justify-center group"
      style={{
        background: `radial-gradient(circle at center, transparent 40%, #cccccc 100%)`
      }}
    >
      <span className="relative text-4xl text-stone-400">+</span>
      
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-stone-800 text-white text-xs rounded whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none ${showTooltip ? 'opacity-90' : ''} group-hover:opacity-90`}
      >
        Add New Item
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-stone-800"></div>
      </div>
    </div>
  );
}

export default PlusOrb;