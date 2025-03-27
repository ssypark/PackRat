// src/App.jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  // New state to handle adding a category
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Fetch categories when the app loads
  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        // Default to the first category if available
        if (data.length > 0) {
          setSelectedCategory(data[0].id);
        }
      })
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  // Fetch items when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:3000/items?category=${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
          // Optionally, clear selectedItem when category changes
          setSelectedItem(null);
        })
        .catch((err) => console.error('Error fetching items:', err));
    }
  }, [selectedCategory]);

  // Handler for adding a new category
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return; // avoid empty submissions

    fetch('http://localhost:3000/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category_name: newCategoryName }),
    })
      .then((res) => res.json())
      .then((data) => {
        // After adding, fetch the updated list of categories
        return fetch('http://localhost:3000/categories');
      })
      .then((res) => res.json())
      .then((updatedCategories) => {
        setCategories(updatedCategories);
        // Optionally, select the new category if desired.
        // For now, just clear the input and hide the form.
        setNewCategoryName('');
        setAddingCategory(false);
      })
      .catch((err) => console.error('Error adding category:', err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Category Tabs at the Top */}
      <div className="mb-4 border-b flex items-center">
        <ul className="flex space-x-4 flex-1">
          {categories.map((cat) => (
            <li
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`cursor-pointer p-2 rounded-t-md border-b-4 transition-colors
                ${cat.id === selectedCategory
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-800 border-transparent hover:border-gray-300'}`}
            >
              {cat.name}
            </li>
          ))}
        </ul>
        {/* Plus button to add new category */}
        <button 
          className="ml-4 bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
          onClick={() => setAddingCategory(true)}
        >
          +
        </button>
      </div>

      {/* Add Category Form (shown when addingCategory is true) */}
      {addingCategory && (
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New Category Name"
            className="p-2 border rounded"
          />
          <button
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            onClick={handleAddCategory}
          >
            Add
          </button>
          <button
            className="bg-gray-300 text-gray-800 p-2 rounded hover:bg-gray-400"
            onClick={() => {
              setAddingCategory(false);
              setNewCategoryName('');
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Flex Container for Grid & Detail Pane */}
      <div className="flex gap-4">
        {/* Left Column: Grid of Items */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white rounded-md shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <img
                src={`http://localhost:3000/images/${item.image_filename}`}
                alt={item.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600 truncate">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Right Column: Item Details */}
        <div className="w-full md:w-1/3 bg-white rounded-md shadow-md p-6">
          {selectedItem ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
              <img
                src={`http://localhost:3000/images/${selectedItem.image_filename}`}
                alt={selectedItem.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <p className="mb-2">{selectedItem.description}</p>
              <p className="text-sm text-gray-600">
                <strong>Category:</strong> {selectedItem.category}
              </p>
            </div>
          ) : (
            <p className="text-gray-600">Select an item to view details.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;