import React, { useState } from "react";

function ModalContent({ onCategoryAdded, onClose }) {
    // these states hold the category name and color
    const [categoryName, setCategoryName] = useState(""); // initially empty
    const [categoryColor, setCategoryColor] = useState("#5e85b5"); // set to initial default color

    // Define a list of preset colors
    const presetColors = [
        "#8A9EBD", 
        "#E04B2B", 
        "#2ECC47", 
        "#2B4CEB", 
        "#E6AC00", 
        "#8E44AD",
        "#27AE60", 
        "#D35400" 
      ];

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
            name: categoryName,
            color: categoryColor,
            dateCreated: new Date().toISOString(), 
        };

        try {
            const response = await fetch("http://localhost:3000/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
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
                onChange={handleCategoryNameChange}
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