import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import DeleteItemModalContent from './DeleteItemModalContent';

function DeleteItemModal({ item, onItemDeleted }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
        onClick={() => setShowModal(true)}
      >
        Delete
      </button>
      {showModal &&
        createPortal(
          <DeleteItemModalContent
            item={item}
            onItemDeleted={onItemDeleted}
            onClose={() => setShowModal(false)}
          />,
          document.body
        )}
    </>
  );
}

export default DeleteItemModal;