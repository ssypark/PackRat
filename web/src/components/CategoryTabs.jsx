// src/components/CategoryTabs.jsx
import React from "react";

function CategoryTabs({ categories, selectedCategory, onSelectCategory, onAddCategory }) {
  
  return (
    <div className="mb-8 border-b relative">
      <ul className="flex space-x-2">
        {categories.map((cat) => {
          const isActive = cat.id === selectedCategory;
          return (
            <li
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="cursor-pointer p-2 px-4 rounded-t-md transition-colors hover:scale-105 "
              style={
                isActive
                  ? { backgroundColor: cat.color, color: "white" }
                  : { backgroundColor: "white", color: cat.color, borderTop: `4px solid ${cat.color}` }
              }
            >
              {cat.name}
            </li>
          );
        })}
        {/* Plus Button Tab */}
        <li
          onClick={onAddCategory}
          className="cursor-pointer p-2 px-4 rounded-t-md transition-colors"
          style={{ backgroundColor: "white", color: "#666", borderTop: "4px solid #666" }}
        >
          +
        </li>
        <li>
          Edit
        </li>
      </ul>
    </div>
  );
}

export default CategoryTabs;