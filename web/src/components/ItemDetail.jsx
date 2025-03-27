// src/components/ItemDetail.jsx
import React from "react";

function ItemDetail({ item }) {
  if (!item) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Select an item to view details.</p>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-max bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{item.name}</h2>
      <p className="text-sm text-gray-600">
        <strong>Category:</strong> {item.category}
      </p>
      <img
        src={`http://localhost:3000/images/${item.image_filename}`}
        alt={item.name}
        className="w-full h-48 object-contain rounded-md mb-4"
      />
  
      <p className="mb-2">{item.description}</p>
      
    </div>
  );
}

export default ItemDetail;
