// src/components/MasonryGrid.jsx
import React from "react";
import MasonryItem from "./MasonryItem";
import PlusOrb from "./PlusOrb";


function MasonryGrid({ items, onSelectItem, categories, onAddItem }) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {/* Plus orb as the first grid item */}
        <PlusOrb onAddItem={onAddItem} />
        {items.map((item) => {
          const category = categories.find((cat) => cat.id === item.category_id);
          const categoryColor = category ? category.color : "#000000";
          return (
            <MasonryItem
              key={item.id}
              item={item}
              categoryColor={categoryColor}
              onSelectItem={onSelectItem}
            />
          );
        })}
      </div>
    </div>
  );
}

export default MasonryGrid;