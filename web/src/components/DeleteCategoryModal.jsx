import React from "react";
import { createPortal } from "react-dom";

function DeleteCategoryModal({ onConfirm, onCancel }) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-stone-900 bg-opacity-50 z-50">
      <div className="bg-stone-200 rounded-md shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="mb-8">Are you sure you want to delete this category? All items in this category will also be deleted.</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-stone-300 text-stone-500 rounded-full hover:text-stone-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DeleteCategoryModal;