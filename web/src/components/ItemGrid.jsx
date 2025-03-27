import React from "react";
import CategoryTabs from "./CategoryTabs";
function ItemGrid({ categories, selectedCategory, onSelectCategory, items, onSelectItem }) {
  return (
    <div className="p-4" >
      {/* Category Tabs styled like folder tabs */}
      <div className="mb-4">
        <CategoryTabs categories={categories} selectedCategory={selectedCategory} onSelectCategory={onSelectCategory} />
      </div>

      {/* Grid of Item Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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
            <p className="text-sm text-gray-600 truncate">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemGrid;