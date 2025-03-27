// src/components/CategoryTabs.jsx
import React from "react";

function CategoryTabs({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="mb-4 border-b">
      <ul className="flex space-x-4">
        {categories.map((cat) => (
          <li
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`cursor-pointer p-2 rounded-t-md border-b-4 transition-colors
              ${cat.id === selectedCategory
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-800 border-transparent hover:border-gray-300"}`}
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryTabs;