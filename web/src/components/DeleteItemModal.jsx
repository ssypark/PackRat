// src/components/DeleteItemModal.jsx
import React from "react";
import { createPortal } from "react-dom";
import DeleteItemModalContent from "./DeleteItemModalContent";

function DeleteItemModal({ item, onClose, onItemDeleted }) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50"
         style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
      <div className="rounded-md shadow-lg max-w-sm w-full">
        <DeleteItemModalContent
          item={item}
          onClose={onClose}
          onItemDeleted={onItemDeleted}
        />
      </div>
    </div>,
    document.body
  );
}

export default DeleteItemModal;