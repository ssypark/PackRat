import React from "react";
import { createPortal } from "react-dom";

function DeleteCategoryModal({ onConfirm, onCancel }) {
  return createPortal(
    <div 
      className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="rounded-md shadow-lg max-w-sm w-full">
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
          <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
          <p className="mb-8">Are you sure you want to delete this category? All items in this category will also be deleted.</p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-stone-300 text-stone-600 rounded-full hover:text-stone-700"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-stone-50 rounded-full hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default DeleteCategoryModal;