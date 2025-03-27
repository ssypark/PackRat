import React from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import ModalContent from "./AddCategoryModalContent";

function AddCategoryModal( {onClose, onCategoryAdded} ) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
          <button className={g['button']} onClick={() => setShowModal(true)}>Add Category</button>      
          
          {showModal && createPortal( <ModalContent onCategoryAdded={onCategoryAdded} onClose={() => setShowModal(false)} /> ,document.body)}
        </>
      );


}

export default AddCategoryModal