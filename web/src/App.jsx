// src/App.jsx
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemGrid from "./components/ItemGrid";
import ItemDetail from "./components/ItemDetail";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch categories on mount
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        if (data.length > 0) setSelectedCategory(data[0].id);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // Fetch items when the selected category changes
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:3000/items?category=${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
          setSelectedItem(null);
        })
        .catch((err) => console.error("Error fetching items:", err));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-1 p-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <ItemGrid
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              items={items}
              onSelectItem={setSelectedItem}
            />
          </div>
          <div className="w-full md:w-1/3">
            <ItemDetail item={selectedItem} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;