// src/components/ItemGrid.jsx
import React from "react";
import CategoryTabs from "./CategoryTabs";

function ItemGrid({ categories, selectedCategory, onSelectCategory, onAddCategory, onAddItem, items, onSelectItem }) {
  return (
    <div className="p-4">
      {/* Category Tabs styled like folder tabs */}
      <div className="mb-4">
        <CategoryTabs 
          categories={categories} 
          selectedCategory={selectedCategory} 
          onSelectCategory={onSelectCategory}
          onAddCategory={onAddCategory}
        />
      </div>

      {/* Regular Grid of Item Cards with Plus Button to add a new item */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {/* Plus Button Grid Item */}
        <div
          onClick={onAddItem}
          className="bg-white rounded-md shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow flex items-center justify-center"
        >
          <span className="text-4xl font-bold text-gray-400">+</span>
        </div>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-white rounded-md shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <img
              src={`http://localhost:3000/images/${item.image_filename}`}
              alt={item.name}
              className="w-full h-32 object-contain rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemGrid;