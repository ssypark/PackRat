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
              className="cursor-pointer p-2 px-4 rounded-t-md transition-colors hover:scale-105 flex items-center "
              style={
                isActive
                  ? { backgroundColor: "white", color: cat.color }
                  : { backgroundColor: "white", color: cat.color }
              }
            >
              <span
                className="w-2 h-2 rounded-full inline-block mr-2"
                style={{ backgroundColor: cat.color }}>
              </span>
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

      </ul>
    </div>
  );
}

export default CategoryTabs;