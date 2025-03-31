import React from "react";

function PlusOrb({ onAddItem }) {
  return (
    <div
      onClick={onAddItem}
      className="relative w-24 h-24 rounded-full bg-white overflow-hidden cursor-pointer flex items-center justify-center"
      style={{
        background: `radial-gradient(circle at center, transparent 40%, #cccccc 100%)`
      }}
    >
      <span className="relative text-4xl text-stone-400">+</span>
    </div>
  );
}

export default PlusOrb;