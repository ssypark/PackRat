// src/components/AddItemModal.jsx
import React from "react";
import { createPortal } from "react-dom";
import AddItemModalContent from "./AddItemModalContent";

function AddItemModal({ onClose, onItemAdded }) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
        {/* Render the content (the form) in a separate component */}
        <AddItemModalContent onItemAdded={onItemAdded} onClose={onClose} />
      </div>
    </div>,
    document.body
  );
}

export default AddItemModal;