import React, { useState } from "react";
import DeleteItemModal from "./DeleteItemModal";
import UpdateItemModal from "./UpdateItemModal";

function ItemDetail({ item, onUpdateRequest, onItemDeleted }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  if (!item) {
    return (
      <div className="flex items-center justify-center h-full text-center p-4">
        <p className="text-stone-600">Select an item to view details.</p>
      </div>
    );
  }

  return (
    <div className="pt-6 sm:pt-8 px-6 sm:px-12 mx-auto h-[700px] overflow-y-auto">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="text-2xl font-bold text-stone-600">{item.name}</p>
          <p className="text-sm text-stone-400">{item.category}</p>
        </div>
        <div className="flex space-x-2 md:space-x-4">
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-4 py-2 bg-stone-400 text-stone-50 rounded-full text-sm hover:bg-orange-500"
          >
            Delete
          </button>
          <button
            onClick={() => onUpdateRequest(item)}
            className="px-4 py-2 bg-indigo-400 text-stone-50 rounded-full text-sm hover:bg-indigo-500"
          >
            Update
          </button>
        </div>
      </div>

      {/* Image */}
      <img
        src={`http://localhost:3000/images/${item.image_filename}`}
        alt={item.name}
        className="mx-auto  object-contain bg-inherit p-4 rounded-md my-10 bg-white shadow-md"
      />

      {/* Description */}
      <div className="p-4 mt-4">
        <p className="mb-0 text-lg text-stone-600 font-bold">Details</p>
        <p className="mb-8 text-stone-600 break-words">{item.description}</p>
      </div>

      {/* Modals */}
      {showDeleteModal && (
        <DeleteItemModal
          item={item}
          onClose={() => setShowDeleteModal(false)}
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
  );
}

export default ItemDetail;