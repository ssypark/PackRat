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
import DeleteCategoryModal from "./components/DeleteCategoryModal";


function App() {
  //CATEGORIES
  // this holds the list of categories with properties such as id, name and color
  const [categories, setCategories] = useState([]);
  // this holds the currently selected category
  const [selectedCategory, setSelectedCategory] = useState(null);
  // this controls the visibility of the add category modal
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  // this controls the visibility of the confirm deletion modal
  const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

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
    <div className="min-h-screen bg-stone-100 flex flex-col relative">

      <Header />

      <main className="container mx-auto ">

        <div className="my-4">
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onAddCategory={() => setShowAddCategoryModal(true)}
            onDeleteCategory={(catId) => {
              // Set the category to delete and show the modal
              const cat = categories.find((c) => c.id === catId);
              setCategoryToDelete(cat);
              setShowDeleteCategoryModal(true);
            }}
          />
        </div>

        <div className="container mx-auto flex flex-1 p-8 flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-1/3 p-8 bg-stone-200  rounded-xl shadow-md">

            <MasonryGrid
              items={items}
              onSelectItem={setSelectedItem}
              categories={categories}
              onAddItem={() => setShowAddItemModal(true)}
            />
          </div>
          <div className="w-full md:w-2/3  bg-stone-200 rounded-xl shadow-md">
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
        </div>

      </main>
      <div className="fixed bottom-0 left-0 w-full bg-stone-100 ">
        <Footer />
      </div>

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
      {/* Confirm Deletion Modal - When an category is deleted, we show this modal */}
      {showDeleteCategoryModal && categoryToDelete && (
        <DeleteCategoryModal
          message={`Are you sure you want to delete category "${categoryToDelete.name}"?`}
          onConfirm={() => {
            fetch(`http://localhost:3000/categories/${categoryToDelete.id}`, {
              method: "DELETE",
            })
              .then((res) => res.json())
              .then(() => {
                // Refresh categories after deletion
                fetch("http://localhost:3000/categories")
                  .then((res) => res.json())
                  .then((data) => {
                    setCategories(data);
                    // Optionally update selectedCategory if needed
                  })
                  .catch((err) =>
                    console.error("Error refreshing categories:", err)
                  );
                setShowDeleteCategoryModal(false);
                setCategoryToDelete(null);
              })
              .catch((err) =>
                console.error("Error deleting category:", err)
              );
          }}
          onCancel={() => {
            setShowDeleteCategoryModal(false);
            setCategoryToDelete(null);
          }}
        />
      )}

    </div>
  );
}

export default App;