// src/components/MasonryItem.jsx
import React from "react";

function MasonryItem({ item, categoryColor, onSelectItem }) {
  const imageUrl = item.image_filename
  ? `http://localhost:3000/images/${item.image_filename}`
  : "";
  // in order for the gradient overlay to work, we need to set the orbColor to the categoryColor which is passed in as a prop from the parent
  const orbColor = categoryColor || "#000000";
  return (
    <div 
      onClick={() => onSelectItem(item)}
      className="relative w-48 h-48 rounded-full overflow-hidden bg-white cursor-pointer"
      style={{
        border: `px solid ${orbColor}`,
        
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
          // For a stronger orb effect, we start transparent around the center
          // and end with 100% color at the edges.
          background: `radial-gradient(circle at center, 
                      transparent 10%,
                      ${orbColor} 60%,
                      ${orbColor} 80%, 
                      ${orbColor} 100%)`,
                      
        }}
      />
      {/* Highlight overlay: This layer adds a white highlight near the top right */}
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
