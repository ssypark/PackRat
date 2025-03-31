// src/components/CategoryTabs.jsx
import React from "react";

function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory,
  onDeleteCategory 
}) {

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
        {/* Plus Button Tab */}
        <li
          onClick={onAddCategory}
          title="Click to add a new category"
          className="cursor-pointer py-2 px-4 shadow-md rounded-full transition-all duration-200 ease-in-out hover:scale-105 hover:-translate-y-1 flex items-center"
          style={{ 
            backgroundColor: "oklch(0.869 0.005 56.366)",
             color: "oklch(0.553 0.013 58.071)",
            
             
             }}
        >
          +
        </li>

      </ul>
    </div>
  );
}

export default CategoryTabs;