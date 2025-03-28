// src/components/AddCategoryModal.jsx
import React from "react";
import { createPortal } from "react-dom";
import AddCategoryModalContent from "./AddCategoryModalContent";

function AddCategoryModal({ onClose, onCategoryAdded }) {
  return createPortal(
    <div
  className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
>
      <div className="bg-white rounded-md shadow-lg p-6 w-full max-w-lg">
        <AddCategoryModalContent 
          onClose={onClose} 
          onCategoryAdded={onCategoryAdded} 
        />
      </div>
    </div>,
    document.body
  );
}

export default AddCategoryModal;