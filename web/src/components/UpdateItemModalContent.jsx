import React, { useState, useEffect } from "react";

function UpdateItemModalContent({ item, onClose, onItemUpdated }) {
  // State for categories from the API
  const [categories, setCategories] = useState([]); // Initialize as an empty array
  // Selected category and the default is the current item's category
  const [selectedCategory, setSelectedCategory] = useState(item.category_id || "");
  // States for item details loaded with current item data from the API
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [image, setImage] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt-token"); // Retrieve the JWT token from localStorage

    fetch("http://localhost:3000/categories", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch categories: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setCategories(data);
        if (data.length > 0 && !selectedCategory) {
          setSelectedCategory(data[0].id);
        }
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
        setCategories([]); // Ensure categories is set to an empty array on error
      });
  }, [selectedCategory]);

  // Handle changes to the category select input
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Handle form submission to update the item
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are included
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category_id", selectedCategory);
    if (image) {
      formData.append("image", image);
    }

    try {
      const token = localStorage.getItem("jwt-token");
      const response = await fetch(`http://localhost:3000/items/${item.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update item: ${response.status} ${errorText}`);
      }

      const updatedItem = await response.json();
      onItemUpdated(updatedItem); // Notify parent component of the update
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-stone-700 mb-4">Edit Item</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
        {/* Category Section */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-stone-700">
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="mt-1 block w-full p-2 border border-stone-300 rounded"
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
          <label htmlFor="name" className="block text-sm font-medium text-stone-700">
            Item Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-stone-300 rounded"
          />
        </div>
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-stone-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full h-48 p-2 border border-stone-300 rounded"
          />
        </div>
        {/* Image Section */}
        <div>
          <label className="block text-sm font-medium text-stone-700">Current Image</label>
          <img
            src={`http://localhost:3000/images/${item.image_filename}`}
            alt={item.name}
            className="w-full h-48 object-contain rounded mb-2"
          />
          {/* Changed label: using inline-block, smaller padding, and fixed width if desired */}
          <label
            htmlFor="image"
            className="inline-block text-sm font-medium text-stone-700 mb-1 cursor-pointer px-4 py-2 bg-indigo-100 rounded-full hover:bg-indigo-200"
          >
            Upload New Image
          </label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
        </div>
        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          {/* Close Modal Button */}
          <button
            type="button"
            onClick={() => { onClose(); }}
            className="px-4 py-2 bg-stone-200 rounded-full text-stone-500 hover:text-stone-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600"
          >
            Save
          </button>

        </div>
      </form>

    </div>
  );
}

export default UpdateItemModalContent;