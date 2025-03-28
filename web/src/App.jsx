import React, { useState, useEffect } from "react";

// COMPONENTS
import Header from "./components/Header";
import Footer from "./components/Footer";
import ItemDetail from "./components/ItemDetail";
import AddItemModal from "./components/AddItemModal";
import AddCategoryModal from "./components/AddCategoryModal";
import UpdateItemModal from "./components/UpdateItemModal";
import DeleteItemModal from "./components/DeleteItemModal";
import MasonryGrid from "./components/MasonryGrid";
import CategoryTabs from "./components/CategoryTabs";
import Squares from "./components/Squares";

function App() {
  //CATEGORIES
  // this holds the list of categories with properties such as id, name and color
  const [categories, setCategories] = useState([]);
  // this holds the currently selected category
  const [selectedCategory, setSelectedCategory] = useState(null);
  // this controls the visibility of the add category modal
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

  //ITEMS
  // this holds the list of items
  const [items, setItems] = useState([]);
  // this holds the currently selected item
  const [selectedItem, setSelectedItem] = useState(null);
  // this controls the visibility of the add item modal
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  // this controls the visibility of the update item modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  // this controls the visibility of the delete item modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // this holds the item to be updated for the user
  const [itemToUpdate, setItemToUpdate] = useState(null);


  // Fetch categories on mount
  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        // this defaults to the first category to be selected
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
          // we also need to clear the selected item in item detail window when the category changes
          setSelectedItem(null);
        })
        .catch((err) => console.error("Error fetching items:", err));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:3000/items?category=${selectedCategory}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched items:", data);
          setItems(data);
          setSelectedItem(null);
        })
        .catch((err) => console.error("Error fetching items:", err));
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-none flex flex-col relative">
      <div className="fixed inset-0 -z-10">
        <Squares
          speed={0.5}
          squareSize={80}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor='#fff'
          hoverFillColor='#222'
        />
      </div>
      <Header />

      <main className="container mx-auto  flex flex-1 p-8">

        <div className="flex gap-4">
          <div className="flex-1">
            {/* <ItemGrid
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onAddCategory={() => {
                setShowAddCategoryModal(true);
              }}
              onAddItem={() => setShowAddItemModal(true)}
              items={items}
              onSelectItem={setSelectedItem}
            /> */}
            <MasonryGrid
              items={items}
              onSelectItem={setSelectedItem}
              categories={categories}
              onAddItem={() => setShowAddItemModal(true)}
            />
          </div>
          <div className="w-full md:w-1/3">
            <ItemDetail
              item={selectedItem}
              onUpdateRequest={(item) => {
                setItemToUpdate(item);
                setShowUpdateModal(true);
              }}
              onItemDeleted={() => {
                // Refreshes item grid here when an item is deleted
                fetch(`http://localhost:3000/items?category=${selectedCategory}`)
                  .then((res) => res.json())
                  .then((data) => {
                    setItems(data);
                    setSelectedItem(null);
                  })
                  .catch((err) => console.error("Error fetching items:", err));
              }}
            />
          </div>
          <div className="fixed bottom-12 left-1/2 transform -translate-x-1/2 z-50 bg-stone-950/50 border border-amber-700 py-4 px-6 rounded-lg">
            <CategoryTabs
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onAddCategory={() => setShowAddCategoryModal(true)}
            />
          </div>
        </div>
      </main>
      <Footer />

      {/* MODALS */}
      {/*  Add Item Modal - when an item is added, the api returns the new item object (newItem) which is then used to refresh/update the item grid */}
      {showAddItemModal && (
        <AddItemModal
          onClose={() => setShowAddItemModal(false)}
          onItemAdded={(newItem) => {
            // for a better experience, we refresh the item grid whenver an item is added/updated/deleted
            // therefore, we refresh the item grid when an item is added by refetching the items upon close/submission
            fetch(`http://localhost:3000/items?category=${selectedCategory}`)
              .then((res) => res.json())
              .then((data) => {
                setItems(data);
                setSelectedItem(null);
              })
              .catch((err) => console.error("Error refreshing items:", err));
            setShowAddItemModal(false);
          }}
        />
      )}
      {/* Add Category Modal - When a new category is added, the API returns the saved category (savedCategory)
          which is used to refresh the category list */}
      {showAddCategoryModal && (
        <AddCategoryModal
          onClose={() => setShowAddCategoryModal(false)}
          onCategoryAdded={(newCategory) => { // newCategory holds the completely saved category object from the API.
            // then we refresh the category list
            fetch("http://localhost:3000/categories")
              .then((res) => res.json())
              .then((data) => {
                setCategories(data);
                if (!selectedCategory && data.length > 0) {
                  setSelectedCategory(data[0].id);
                }
              })
              .catch((err) => console.error("Error refreshing categories:", err));
            setShowAddCategoryModal(false);
          }}
        />
      )}

      {/* Update Item Modal - When an item is updated, the API returns the updated item,
          and we refresh the item grid by re-fetching the items */}
      {showUpdateModal && itemToUpdate && (
        <UpdateItemModal
          item={itemToUpdate}
          onClose={() => setShowUpdateModal(false)}
          onItemUpdated={() => {
            // Refreshes item grid here when an item is updated
            fetch(`http://localhost:3000/items?category=${selectedCategory}`)
              .then((res) => res.json())
              .then((data) => {
                setItems(data);
                setSelectedItem(null);
              })
              .catch((err) => console.error("Error refreshing items:", err));
            setShowUpdateModal(false);
          }}
        />
      )}

      {/* Delete Item Modal - When an item is deleted, we refresh the grid by re-fetching the items */}
      {showDeleteModal && (
        <DeleteItemModal
          item={selectedItem}
          onClose={() => setShowDeleteModal(false)}
          onItemDeleted={() => {
            fetch(`http://localhost:3000/items?category=${selectedCategory}`)
              .then((res) => res.json())
              .then((data) => {
                setItems(data);
                setSelectedItem(null);
              })
              .catch((err) => console.error("Error refreshing items:", err));
            setShowDeleteModal(false);
          }}
        />
      )}


    </div>
  );
}

export default App;