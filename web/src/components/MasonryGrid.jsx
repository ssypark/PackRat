// src/components/MasonryGrid.jsx
import React from "react";
import MasonryItem from "./MasonryItem";
import PlusOrb from "./PlusOrb";


function MasonryGrid({ items, onSelectItem, categories, onAddItem }) {
  return (
    <div className="p-4 h-[400px] sm:h-[900px] overflow-y-auto">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] gap-4" >
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