import React, { useState } from "react";

function ModalContent({ onCategoryAdded, onClose }) {
    const [categoryName, setCategoryName] = useState("");
    const [categoryColor, setCategoryColor] = useState("#a2b7d1");

    const handleCategoryNameChange = (event) => {
        setCategoryName(event.target.value);
    };

    const handleCategoryColorChange = (event) => {
        setCategoryColor(event.target.value);
    };

    const handleAddCategory = () => {
        if (!categoryName) {
            alert('Please enter a category name.');
            return;
        }

        const newCategory = {
            name: categoryName,
            color: categoryColor,
            dateCreated: new Date().toISOString(),
        };

        onCategoryAdded(newCategory);
        onClose();

        // Reset fields
        setCategoryName('');
        setCategoryColor('#a2b7d1');
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Category Name"
                value={categoryName}
                onChange={handleCategoryNameChange}
            />
            <input
                type="color"
                value={categoryColor}
                onChange={handleCategoryColorChange}
            />
            <button onClick={handleAddCategory}>Add Category</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default ModalContent;