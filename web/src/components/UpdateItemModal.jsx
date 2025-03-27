// src/components/UpdateItemModal.jsx
import React from "react";
import { createPortal } from "react-dom";
import UpdateItemModalContent from "./UpdateItemModalContent";

function UpdateItemModal({ item, onClose, onItemUpdated }) {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white rounded-md shadow-lg p-6 max-w-lg w-full">
        <UpdateItemModalContent
          item={item}
          onClose={onClose}
          onItemUpdated={onItemUpdated}
        />
      </div>
    </div>,
    document.body
  );
}

export default UpdateItemModal;