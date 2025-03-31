// src/components/DeleteItemModal.jsx
import React from "react";
import { createPortal } from "react-dom";
import DeleteItemModalContent from "./DeleteItemModalContent";

function DeleteItemModal({ item, onClose, onItemDeleted }) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="rounded-md shadow-lg p-6 max-w-sm w-full">
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