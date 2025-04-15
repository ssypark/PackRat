// src/components/MasonryGrid.jsx
import React from "react";
import MasonryItem from "./MasonryItem";
import PlusOrb from "./PlusOrb";

function MasonryGrid({ items, onSelectItem, categories, onAddItem }) {
  return (
    <div className="p-4 h-full flex justify-center items-start">
      <div className="flex flex-wrap gap-4 justify-center items-start">
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