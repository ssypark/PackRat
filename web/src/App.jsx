import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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

// Import auth components and pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Import auth HOC
import authRequired from "./authRequired";

function App() {
  // AUTH STATE
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  // Check for existing JWT token on mount
  useEffect(() => {
    const token = localStorage.getItem("jwt-token");
    const email = localStorage.getItem("userEmail");
    if (token && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    }
  }, []);

  // AUTHENTICATION HANDLERS
  const handleLogin = (token, email) => {
    localStorage.setItem("jwt-token", token);
    localStorage.setItem("userEmail", email);
    setIsAuthenticated(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  //CATEGORIES
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showConfirmDeletion, setShowConfirmDeletion] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);

  //ITEMS
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToUpdate, setItemToUpdate] = useState(null);

  // Fetch categories with authentication
  useEffect(() => {
    if (isAuthenticated) {
      fetch("http://localhost:3000/categories", {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
        }
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then(text => {
              throw new Error(`Failed to fetch categories: ${res.status}`);
            });
          }
          return res.json();
        })
        .then((data) => {
          setCategories(data);
          if (data.length > 0) setSelectedCategory(data[0].id);
        })
        .catch((err) => {
          console.error("Error fetching categories:", err);
          // Important: Set categories to empty array on error
          setCategories([]);
        });
    }
  }, [isAuthenticated]);

  // Fetch items when category changes with authentication
  useEffect(() => {
    if (selectedCategory && isAuthenticated) {
      fetch(`http://localhost:3000/items?category=${selectedCategory}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
          setSelectedItem(null);
        })
        .catch((err) => console.error("Error fetching items:", err));
    }
  }, [selectedCategory, isAuthenticated]);

  // Create protected components using HOC
  const Home = () => (
    <main className="container mx-auto">
      <div className="my-4">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onAddCategory={() => setShowAddCategoryModal(true)}
          onDeleteCategory={(catId) => {
            const cat = categories.find((c) => c.id === catId);
            setCategoryToDelete(cat);
            setShowDeleteCategoryModal(true);
          }}
        />
      </div>

      <div className="container mx-auto flex flex-1 p-8 flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 p-8 bg-stone-200 rounded-xl shadow-md">
          <MasonryGrid
            items={items}
            onSelectItem={setSelectedItem}
            categories={categories}
            onAddItem={() => setShowAddItemModal(true)}
          />
        </div>
        <div className="w-full md:w-2/3 bg-stone-200 rounded-xl shadow-md">
          <ItemDetail
            item={selectedItem}
            onUpdateRequest={(item) => {
              setItemToUpdate(item);
              setShowUpdateModal(true);
            }}
            onItemDeleted={() => {
              fetch(`http://localhost:3000/items?category=${selectedCategory}`, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                }
              })
                .then((res) => res.json())
                .then((data) => {
                  setItems(data);
                  setSelectedItem(null);
                })
                .catch((err) => console.error("Error refreshing items:", err));
            }}
          />
        </div>
      </div>
    </main>
  );

  // Wrap with authentication protection
  const ProtectedHome = authRequired(Home);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-stone-200 flex flex-col relative">
        <Header
          handleLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          userEmail={userEmail}
        />

        <Routes>
          {/* Public routes */}
          <Route
            path="/sign-in"
            element={
              !isAuthenticated ? (
                <SignIn handleLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/sign-up"
            element={
              !isAuthenticated ? (
                <SignUp />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Protected routes */}
          <Route
            path="/"
            element={isAuthenticated ? <ProtectedHome /> : <Navigate to="/sign-in" />}
          />
        </Routes>

        <div className="fixed bottom-0 left-0 w-full">
          <Footer />
        </div>

        {/* MODALS */}
        {showAddItemModal && (
          <AddItemModal
            onClose={() => setShowAddItemModal(false)}
            selectedCategoryId={selectedCategory} // and here, we pass the currently selected category
            onItemAdded={(newItem) => {
              fetch(`http://localhost:3000/items?category=${selectedCategory}`, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                }
              })
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

        {showAddCategoryModal && (
          <AddCategoryModal
            onClose={() => setShowAddCategoryModal(false)}
            onCategoryAdded={(newCategory) => {
              fetch("http://localhost:3000/categories", {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                }
              })
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

        {showUpdateModal && itemToUpdate && (
          <UpdateItemModal
            item={itemToUpdate}
            onClose={() => setShowUpdateModal(false)}
            onItemUpdated={() => {
              fetch(`http://localhost:3000/items?category=${selectedCategory}`, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                }
              })
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

        {showDeleteModal && (
          <DeleteItemModal
            item={selectedItem}
            onClose={() => setShowDeleteModal(false)}
            onItemDeleted={() => {
              fetch(`http://localhost:3000/items?category=${selectedCategory}`, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                }
              })
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

        {showDeleteCategoryModal && categoryToDelete && (
          <DeleteCategoryModal
            // we also need a token for this request since categories are a protected resource as well
            // see AddCategoryModalContent.jsx for full explanation on how this works

            // Deleting a category is a bit different from deleting an item
            // because we need to check if there are any items in that category
            // before we can delete it. If there are items in the category, we need to show a confirmation modal
            // to confirm that the user wants to delete the category and all its items
            // If there are no items in the category, we can delete it directly
            message={`Are you sure you want to delete category "${categoryToDelete.name}"?`}
            onConfirm={() => {
              fetch(`http://localhost:3000/categories/${categoryToDelete.id}`, {
                method: "DELETE",
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("jwt-token")}` // JWT authentication
                }
              })
                .then((res) => {
                  if (!res.ok) {
                    // if unsuccessful, throw an error
                    return res.text().then(text => {
                      throw new Error(`Failed to delete category: ${res.status} ${text}`);
                    });
                  }
                  // if successful, parse the JSON response
                  return res.json();
                })
                .then(() => {
                  // for better UX, after deleting the category, we need to refresh the categories list
                  // so here we close the modal and reset the state
                  setShowDeleteCategoryModal(false);
                  setCategoryToDelete(null);

                  // Fetch updated categories to update the UI
                  fetch("http://localhost:3000/categories", {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem("jwt-token")}`
                    }
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      // Update the categories state with the refreshed data
                      setCategories(data);

                      // If we deleted the currently selected category, select another one
                      if (selectedCategory === categoryToDelete.id) {
                        if (data.length > 0) {
                          // if there are no other categories, select the first one (0)
                          setSelectedCategory(data[0].id);
                        } else {
                          // if there are no other categories, we clear the selection and items by selecting null
                          setSelectedCategory(null);
                          setItems([]);
                        }
                      }
                    })
                })
                .catch((err) => {
                  // if there was an error, log it and show an error message
                  console.error("Error deleting category:", err);
                  alert("Error deleting category. Please try again.");
                });
            }}
            onCancel={() => {
              setShowDeleteCategoryModal(false);
              setCategoryToDelete(null);
            }}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;