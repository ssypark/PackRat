import React, { useState, useEffect } from "react";

function UpdateItemModalContent({ item, onClose, onItemUpdated }) {
  // State for categories from the API
  const [categories, setCategories] = useState([]);
  // Selected category and the default is the current item's category
  const [selectedCategory, setSelectedCategory] = useState(item.category_id || "");
  // States for item details loaded with current item data from the API
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0 && !selectedCategory) {
          setSelectedCategory(data[0].id);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [selectedCategory]); // Empty dependency array means this effect runs once on mount

  // Handle changes to the category select input
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle form submission to update the item
  const handleSubmit = async (e) => {
    // Prevent the default HTML form from submitting
    e.preventDefault();
    // Set the category ID based on the selected category
    let categoryId = selectedCategory;

    // Build a FormData object to send the updated data, including an optional updated image
    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    // Send a PUT request to update the item
    try {
      const response = await fetch(`http://localhost:3000/items/${item.id}`, {
        method: "PUT",
        body: formData,
      });
      // If the response isnt OK, throw an error
      if (!response.ok) throw new Error("Failed to update item");
      // If the response is OK, parse the JSON data
      const result = await response.json(); 
      console.log("Update result:", result);
      // once the item is updated, call the onItemUpdated function and then close the modal
      onItemUpdated(); // Refresh the item list in the parent component
      onClose();       // Close the modal
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Error updating item. Please try again.");
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Edit Item</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        {/* Category Section */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Item Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Item Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        {/* Image Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Image</label>
          <img
            src={`http://localhost:3000/images/${item.image_filename}`}
            alt={item.name}
            className="w-full h-48 object-contain rounded mb-2"
          />
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload New Image
          </label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full"
          />
        </div>
        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
                {/* Close Modal Button */}
      <button
        type="button"
        onClick={() => { console.log("Cancel clicked"); onClose(); }}
        className="px-4 py-2 bg-gray-200 rounded text-gray-500 hover:text-gray-700"
      >
        Cancel
      </button>
        </div>
      </form>

    </div>
  );
}

export default UpdateItemModalContent;