// src/components/AddItemModal.jsx
import React from "react";
import { createPortal } from "react-dom";
import AddItemModalContent from "./AddItemModalContent";

// Add selectedCategoryId to the props
function AddItemModal({ onClose, onItemAdded, selectedCategoryId }) {
    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
                <AddItemModalContent 
                    onItemAdded={onItemAdded} 
                    onClose={onClose}
                    // Here is where we pass the selected category ID to default the current/selected category
                    // and then we pass it to App.jsx for the modal to be rendered
                    selectedCategoryId={selectedCategoryId} 
                />
            </div>
        </div>,
        document.body
    );
}

export default AddItemModal;