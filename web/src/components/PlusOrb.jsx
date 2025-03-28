import React from "react";

function PlusOrb({ onAddItem }) {
  return (
    <div
      onClick={onAddItem}
      className="relative w-48 h-48 rounded-full bg-white overflow-hidden cursor-pointer flex items-center justify-center"
      style={{
        background: `radial-gradient(circle at center, transparent 40%, #cccccc 100%)`
      }}
    >
      <span className="relative text-6xl font-bold text-gray-600">+</span>
    </div>
  );
}

export default PlusOrb;