import React, { useState } from "react";

function ModalContent({ onCategoryAdded, onClose }) {
    // these states hold the category name and color
    const [categoryName, setCategoryName] = useState(""); // initially empty
    const [categoryColor, setCategoryColor] = useState("#5e85b5"); // set to initial default color

    // Define a list of preset colors
    const presetColors = [
        "#AEC8E0", 
        "#DBB1CF", 
        "#BDD9A7",
        "#C9D6E3", 
        "#E2B8D9", 
        "#D1E8C2", 
        "#F2D1B3", 
        "#F7E1A0"
      ];
    
    // See AddItemModalContent.jsx for full explanation
    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value); // this updates the state whenever the input value changes
    };

    // Instead of a color picker, use buttons or a select dropdown for preset colors.
    const handleColorSelect = (color) => {
        setCategoryColor(color);
    };

    // this function is called when the user clicks the "Add Category" button
    const handleAddCategory = async () => { 
        // this checks that the category name is not empty. if it is, an alert is shown
        if (!categoryName.trim()) {
            alert('Please enter a category name.');
            return;
        }
        // this creates a new category object which includes the category name, color, and date created
        const newCategory = {
            category_name: categoryName,
            color: categoryColor,
            dateCreated: new Date().toISOString(), 
        };
        // when a user logs in, a JWT token is generated and sent to the client
        // this token contains encoded user information (email, id, etc) and is used to authenticate the user
        // the token is signed in with a secret key that is known only to the server
        // this token is stored in localStorage and is used to authenticate the user

        // for any protected endpoint (in this case, adding a category), we need to send the JWT token in the headers of our request
        // This is done by adding an Authorization header with format: "Bearer [token]", wihout this, the server responds with a 401 Unauthorized error
        // The server will check if the token is valid and if the user has permission to add a category
        // upon recieving the request, the server will decode the token from the header and checks if the user is authorized, extracts the users data, allows to proceed
        // this is done in the fetch request below
        try {
            // Get the JWT token from localStorage
            const token = localStorage.getItem("jwt-token");
            
            // we then send a POST request including the token in the header of the request
            // without the token, the server will not allow the request to go through
            const response = await fetch("http://localhost:3000/categories", {
                method: "POST",
                headers: { 
                    // Set the content type to JSON
                    "Content-Type": "application/json",
                    // Include the JWT token in the Authorization header followed by the word Bearer
                    // the Bearer keyword is used to indicate that the token is a bearer token/authentication scheme
                    "Authorization": `Bearer ${token}` 
                },
                body: JSON.stringify(newCategory),
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to add category: ${response.status} ${errorText}`);
            }
            const savedCategory = await response.json();
            onCategoryAdded(savedCategory); 
            onClose();
        } catch (error) {
            console.error("Error in handleAddCategory:", error);
            alert("Error adding category. Please try again.");
        }
        
        setCategoryName('');
        setCategoryColor('#5e85b5');
    };

    return (
        <div className="p-4">
            <p className="mb-2 font-bold">Add a Category</p>
            <input
                type="text"
                placeholder="Category Name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="border p-2 rounded mb-8 w-full"
            />
            <div className="mb-12">
                <p className="mb-2">Select a Color:</p>
                <div className="flex space-x-2">
                    {presetColors.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() => handleColorSelect(color)}
                            className={`w-8 h-8 rounded-full border-2 ${categoryColor === color
                                    ? "border-black"
                                    : "border-transparent"
                                }`}
                            style={{ backgroundColor: color }}
                        ></button>
                    ))}
                </div>
            </div>
            <div className="flex space-x-2">
                <button
                    onClick={handleAddCategory}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Category
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default ModalContent;