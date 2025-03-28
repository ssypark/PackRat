import React from "react";
import { useState } from "react";
import DeleteItemModal from "./DeleteItemModal";
import UpdateItemModal from "./UpdateItemModal";

function ItemDetail({ item, onUpdateRequest, onItemDeleted }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  if (!item) {
    return (
      <div className="p-4">
        <p className="text-gray-600">Select an item to view details.</p>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-max mt-24  bg-white rounded-md shadow-md">
      <img
      //we can get the image_filename from the item object and use it to construct the image URL to display
        src={`http://localhost:3000/images/${item.image_filename}`}
        // we can get the name from the item object and use it as the alt text
        alt={item.name}
        className="w-full h-48 object-contain rounded-md my-10"
      />
      <div className="p-4 mt-12">
        <h2 className="text-2xl font-bold">{item.name}</h2>
        <p className="text-sm text-gray-600 mb-4">
          <strong>Category:</strong> {item.category}
        </p>
        <p className="mb-0 font-bold">Details</p>
        <p className="mb-8">{item.description}</p>

        <div className="flex justify-end space-x-4">
          <button
            //since we want to update the item, we call the onUpdateRequest function but instead of having the showUpdateModal inside ItemDetail.jsx, we add it as a prop so that the parent component can call it when requesting the update
            onClick={() => onUpdateRequest(item)}
            className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
            Update
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">
            Delete
          </button>
        </div>

        {showDeleteModal && (
          <DeleteItemModal
            item={item}
            // we can add a prop called onItemDeleted to the DeleteItemModal component so that the parent component can call it when the item is deleted
            // this is useful when we want to update the list of items after deleting an item
            onItemDeleted={() => {
              setShowDeleteModal(false);
              if (onItemDeleted) onItemDeleted();
            }}
          />
        )}
        {showUpdateModal && (
          <UpdateItemModal
            item={item}
            onItemUpdated={() => setShowUpdateModal(false)}
          />
        )}

      </div>
    </div>
  );
}

export default ItemDetail;
