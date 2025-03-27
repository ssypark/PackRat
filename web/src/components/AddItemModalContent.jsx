import React, { useState, useEffect } from "react";

function AddItemModalContent({ onItemAdded, onClose }) {
    // The state variables for the form to hold the category, name, description, and image of the item
    const [categories, setCategories] = useState([]);
    const [itemCategory, setItemCategory] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemDescription, setItemDescription] = useState("");
    const [itemImage, setItemImage] = useState(null);

    // Fetch categories when the component mounts so that the user can select a category dropdown when adding an item
    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then(res => res.json())
            .then(data => {
                setCategories(data);
                if (data.length > 0) {
                    setItemCategory(data[0].id); // Default to the first category
                }
            });
    }, []);

    // this function handles the form submission
    // it prevents the default form submission behavior, creates a FormData object, and sends a POST request to the API
    // after the request is successful, it calls the onItemAdded function and closes the modal
    const handleFormSubmit = (event) => {

        // Stop the HTML form from submitting
        event.preventDefault();

        // this checks that all required fields are filled
        if (!itemName || !itemCategory) {
            alert('Please fill in all required fields.');
            return;
        }

        // NOTE: since we have a separate modal for adding categories, we will not be adding a new category here

        // Create FormData object to send the item data including the image file
        const formData = new FormData();
        formData.append("name", itemName);
        formData.append("description", itemDescription);
        formData.append("category_id", itemCategory);
        formData.append("image", itemImage);

        fetch("http://localhost:3000/items", {
            method: "POST",
            body: formData,
        })
        .then(response => response.json())
        .then(() => {
            onItemAdded();
            onClose();
        });

        setItemName('');
        setItemDescription('');
        setItemCategory(categories.length > 0 ? categories[0].id : '');
        setItemImage(null);
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={e => setItemName(e.target.value)}
                />
                <textarea
                    placeholder="Description"
                    value={itemDescription}
                    onChange={e => setItemDescription(e.target.value)}
                />
                <select value={itemCategory} onChange={e => setItemCategory(e.target.value)}>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                <input type="file" onChange={e => setItemImage(e.target.files[0])} />
                <button type="submit">Add Item</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
}

export default AddItemModalContent;