// src/components/CategoryTabs.jsx
import React, { useState } from "react";

function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory 
}) {
  // Add state for tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center justify-center h-16">
      <ul className="flex space-x-4 items-center">
        {categories.map((cat) => {
          const isActive = cat.id === selectedCategory;
          return (
            <li
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="cursor-pointer py-2 pl-8 pr-4 shadow-md rounded-full transition-all duration-200 ease-in-out hover:scale-105 hover:-translate-y-1 flex items-center"
              style={
                isActive
                  ? {
                    backgroundColor: `${cat.color}`,
                    boxShadow: `0px 0px 16px ${cat.color}`,
                    color: "oklch(0.444 0.011 73.639)",
                    scale: "1.1"
                  }
                  : {
                    backgroundColor: "oklch(0.869 0.005 56.366)",
                    color: "oklch(0.553 0.013 58.071)",
                  }
              }
            >
              {cat.name}
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteCategory(cat.id); 
                }}
                className="ml-4 text-lg text-stone-400 hover:text-red-600 cursor-pointer"
              >
                &times;
              </span>
            </li>
          );
        })}
        {/* Plus Button Tab with Tooltip */}
        <li
          onClick={onAddCategory}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="relative cursor-pointer py-2 px-4 shadow-md rounded-full transition-all duration-200 ease-in-out hover:scale-105 hover:-translate-y-1 flex items-center group"
          style={{ 
            backgroundColor: "oklch(0.869 0.005 56.366)",
            color: "oklch(0.553 0.013 58.071)",
          }}
        >
          +
          {/* Tooltip */}
          <div 
            className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-stone-800 text-white text-xs rounded whitespace-nowrap opacity-0 transition-opacity duration-200 pointer-events-none ${showTooltip ? 'opacity-90' : ''} group-hover:opacity-90`}
          >
            Add New Category
            {/* Tooltip arrow */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-stone-800"></div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default CategoryTabs;