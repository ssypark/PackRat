// src/components/CategoryTabs.jsx
import React from "react";

function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
  onAddCategory
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
              className="cursor-pointer py-2 px-8 rounded-full transition-all duration-200 ease-in-out hover:scale-105 hover:-translate-y-1 flex items-center"
              style={
                isActive
                  ? {
                    backgroundColor: "oklch(0.268 0.007 34.298)",
                    boxShadow: `0px 0px 12px ${cat.color}`,
                    color: cat.color,
                    scale: "1.1"
                  }
                  : {
                    backgroundColor: "oklch(0.268 0.007 34.298)",
                    color: "oklch(0.869 0.005 56.366)",
                    border: `1px solid ${cat.color}`
                  }
              }
            >

              {cat.name}
            </li>
          );
        })}
        {/* Plus Button Tab */}
        <li
          onClick={onAddCategory}
          className="cursor-pointer py-2 px-8 rounded-full transition-all duration-200 ease-in-out hover:scale-105 hover:-translate-y-1 flex items-center"
          style={{ 
            backgroundColor: "oklch(0.268 0.007 34.298)",
             color: "#666",
              boxShadow: "0px 0px 12px #666",
             }}
        >
          +
        </li>

      </ul>
    </div>
  );
}

export default CategoryTabs;