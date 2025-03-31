import React from "react";

// Deleting an item is more straightforward than adding one because we only need to pass the item ID
function DeleteItemModalContent({ item, onClose, onItemDeleted }) {
  console.log("DeleteItemModalContent onClose:", onClose);
    // this function handles the deletion of an item
  const handleDeleteItem = async (event) => {
    // Prevent the default HTML form from submitting
    event.preventDefault();

    // Send a DELETE request to the API
    // The DELETE request is sent to the corresponding '/items/:id' endpoint
    fetch(`http://localhost:3000/items/${item.id}`, {
        method: "DELETE",
      })
      .then((response) => response.json())
      .then(data => {
        console.log(data);
        onItemDeleted();
        onClose();
      })
  }
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-stone-200 rounded-md shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">
          Are you sure you want to delete{" "}
          <span className="text-red-500">{item.name}</span>?
        </h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => onClose()}
            className="px-4 py-2 bg-stone-300 text-stone-600 rounded-full hover:text-stone-700"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteItem}
            className="px-4 py-2 bg-red-600 text-stone-50 rounded-full hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteItemModalContent;