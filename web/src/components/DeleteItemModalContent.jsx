import React from "react";

// Deleting an item is more straightforward than adding one because we only need to pass the item ID
function DeleteItemModalContent({ item, onClose, onItemDeleted }) {
  console.log("DeleteItemModalContent onClose:", onClose);
  
  // this function handles the deletion of an item
  const handleDeleteItem = async (event) => {
    // Prevent the default HTML form from submitting
    event.preventDefault();
    
    // since this is also a protected route, we need to send the JWT token in the headers of our request
    // See AddCategoryModalContent.jsx for full explanation

    try {
      // Get the JWT token from localStorage for authentication
      const token = localStorage.getItem("jwt-token");

      // Send a DELETE request to the API with authentication
      // JWT token must be included in the Authorization header for all protected routes
      // Without this token, the server will respond with a 401 Unauthorized error
      const response = await fetch(`http://localhost:3000/items/${item.id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}` 
          }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete item: ${response.status} ${errorText}`);
      }
      
      const data = await response.json();
      console.log(data);
      onItemDeleted();
      onClose();
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Error deleting item. Please try again.");
    }
  }
  
  return (
    // Remove the fixed inset-0 classes as they create another full-screen overlay
    // Just return the modal content itself
    <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">
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
  );
}

export default DeleteItemModalContent;