// src/components/AddCategoryModal.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom"; // createPortal is used to render the modal outside of it's parent component
import AddCategoryModalContent from "./AddCategoryModalContent";

function AddCategoryModal({ onClose, onCategoryAdded }) {
  const [showModal, setShowModal] = useState(false);

  const handleOpen = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    if (onClose) onClose(); // Optionally call onClose if provided
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
        onClick={handleOpen}
      >
        Add New Category
      </button>
      
      {/* Conditionally render the modal using createPortal */}
      {showModal &&
        createPortal(
          <AddCategoryModalContent
            onCategoryAdded={onCategoryAdded}
            onClose={handleClose}
          />,
          document.body
        )}
    </>
  );
}

export default AddCategoryModal;