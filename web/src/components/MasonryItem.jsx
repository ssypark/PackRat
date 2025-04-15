import React, { useState } from "react";

function MasonryItem({ item, categoryColor, onSelectItem }) {
  const [showTooltip, setShowTooltip] = useState(false);
  
  const imageUrl = item.image_filename
    ? `http://localhost:3000/images/${item.image_filename}`
    : "";

  const orbColor = categoryColor || "#000000";

  return (
    <div
      onClick={() => onSelectItem(item)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      title={item.name}
      className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-visible bg-white cursor-pointer shadow-lg hover:scale-115 transition-all duration-200 ease-in-out group"
      style={{
        border: `1px solid ${orbColor}`,
      }}
    >
      {/* Background image layer */}
      <div
        className="absolute rounded-full inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Orb overlay */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at center, transparent 10%, ${orbColor} 60%, ${orbColor} 80%, ${orbColor} 100%)`,
        }}
      />
      {/* Highlight overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none rounded-full"
        style={{
          background: `radial-gradient(circle at top right, rgba(255,255,255,0.9) 0%, transparent 50%)`,
        }}
      />
      
      {/* Tooltip */}
      <div 
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-stone-800 text-white text-xs rounded whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none ${showTooltip ? 'opacity-90' : ''} group-hover:opacity-90 z-30`}
      >
        {item.name}
        {/* Tooltip arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-stone-800"></div>
      </div>
    </div>
  );
}

export default MasonryItem;