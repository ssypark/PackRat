// src/components/AddItemModal.jsx
import React from "react";
import { createPortal } from "react-dom";
import AddItemModalContent from "./AddItemModalContent";

function AddItemModal({ onClose, onItemAdded }) {
    return createPortal(
        <div
            className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
            <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
                <AddItemModalContent onItemAdded={onItemAdded} onClose={onClose} />
            </div>
        </div>,
        document.body
    );
}

export default AddItemModal;