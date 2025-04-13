import React, { useState, useEffect } from "react";

// Add selectedCategoryId to the props
function AddItemModalContent({ onItemAdded, onClose, selectedCategoryId }) {
  // The state variables for the form
  const [categories, setCategories] = useState([]);
  // Initialize with the selected category if available
  const [itemCategory, setItemCategory] = useState(selectedCategoryId || "");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImage, setItemImage] = useState(null);

  // Fetch categories when the component mounts
  useEffect(() => {
    // Get the JWT token from localStorage for authentication
    const token = localStorage.getItem("jwt-token");

    fetch("http://localhost:3000/categories", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // in the previous version, the dropdown was selected to the first category by default
        // to improve UI, I wanted to set the selected category to the one that was passed in so we set it here
        // Set the categories state with the fetched data
        setCategories(data);
        // If selectedCategoryId is provided, use it
        if (selectedCategoryId) {
          setItemCategory(selectedCategoryId);
          // Otherwise default to the first category (if available)
        } else if (data.length > 0) {
          setItemCategory(data[0].id);
        }
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, [selectedCategoryId]); // Add selectedCategoryId to dependency array

  // this function handles the form submission
  // it prevents the default form submission behavior, creates a FormData object, and sends a POST request to the API
  // after the request is successful, it calls the onItemAdded function and closes the modal
  const handleFormSubmit = (event) => {

    // Stop the default HTML form from submitting
    // we need this in order to prevent the page from reloading
    event.preventDefault();

    // this checks that all required fields are filled so that items can be added to its appropriate
    // category, name, description, and image
    if (!itemName || !itemCategory) {
      alert('Please fill in all required fields.');
      return;
    }

    // NOTE: Unlike the lab example, we have a separate modal for adding categories, we will not be adding a new category here

    // This is a FormData object to send the item data including the image file
    const formData = new FormData();
    formData.append("name", itemName);
    formData.append("description", itemDescription);
    formData.append("category_id", itemCategory);
    formData.append("image", itemImage);

    // See AddCategoryModalContent.jsx for full explanation
    // Get the JWT token from localStorage for authentication
    const token = localStorage.getItem("jwt-token");

    // when the form is submitted, a POST request is sent to the API to the '/items' endpoint
    fetch("http://localhost:3000/items", {
      method: "POST",
      headers: {
        // No Content-Type header needed when using FormData
        "Authorization": `Bearer ${token}` // Including the JWT token for authentication
      },
      body: formData,
    })
      // then it calls the onItemAdded function and closes the modal ofter a successful response
      .then(response => response.json())
      .then((newItem) => {
        onItemAdded(newItem); // Refresh the item list in the parent component by passing the new item back to it
        onClose();
      });

    // this resets the form fields after the item is added
    // so that the user can add another item
    setItemName('');
    setItemDescription('');
    setItemCategory(categories.length > 0 ? categories[0].id : '');
    setItemImage(null);
  };

  return (
    <div className="px-6 pb-6">
      <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Add Item</h2>
          <label htmlFor="itemName" className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            id="itemName"
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="itemDescription" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="itemDescription"
            placeholder="Description"
            value={itemDescription}
            onChange={e => setItemDescription(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <label htmlFor="itemCategory" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="itemCategory"
            value={itemCategory}
            onChange={e => setItemCategory(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 pl-3 pr-10 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4 " viewBox="0 0 20 20">
              <path d="M7 10l5 5 5-5H7z" />
            </svg>
          </div>
        </div>

        <div>
          <label htmlFor="itemImage" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            id="itemImage"
            type="file"
            onChange={e => setItemImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:rounded-md file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddItemModalContent;