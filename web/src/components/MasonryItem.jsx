// src/components/MasonryItem.jsx
import React from "react";

function MasonryItem({ item, categoryColor, onSelectItem }) {
  const imageUrl = item.image_filename
    ? `http://localhost:3000/images/${item.image_filename}`
    : "";
  // Use the passed categoryColor or default to black
  const orbColor = categoryColor || "#000000";
  
  return (
    <div 
      onClick={() => onSelectItem(item)}
      title={item.name}
      className="relative w-24 h-24 rounded-full overflow-hidden bg-white cursor-pointer shadow-lg hover:scale-115 transition-all duration-200 ease-in-out"
      style={{
        border: `1px solid ${orbColor}`,
      }}
    >
      {/* 1) Background image layer */}
      <div
        className="absolute rounded-full inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* 2) Orb overlay: radial gradient from transparent center to fully opaque edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, transparent 10%, ${orbColor} 60%, ${orbColor} 80%, ${orbColor} 100%)`,
        }}
      />
      {/* 3) Highlight overlay */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, rgba(255,255,255,0.9) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
}

export default MasonryItem;