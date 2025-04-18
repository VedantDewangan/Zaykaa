import React, { useState } from 'react';
import './AddFoodItem.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function AddFoodItem() {
    const [name, SetName] = useState("");
    const [desc, SetDesc] = useState("");
    const [cat, SetCat] = useState("");
    const [price, SetPrice] = useState("");
    const [image, SetImage] = useState(null);
    const [loading, SetLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) return toast.error("Please enter the food name");
        if (!desc) return toast.error("Please enter the food description");
        if (!cat) return toast.error("Please select the category");
        if (!price || price <= 0) return toast.error("Please enter a valid price");
        if (!image) return toast.error("Please choose an image");

        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "Lazzez");
        formData.append("cloud_name", "do1lffrun");

        SetLoading(true);

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/do1lffrun/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            const link = data.secure_url;
            console.log(link);

            await axios.post("http://localhost:3000/api/food/add", {
                name,
                description: desc,
                image: link,
                category: cat,
                price,
            });

            toast.success("Food added successfully");

            SetName("");
            SetDesc("");
            SetPrice("");
            SetImage(null);
            SetCat("");

            document.querySelector('input[type="file"]').value = "";
        } catch (error) {
            toast.error("Something went wrong");
            console.error("Error:", error);
        }

        SetLoading(false);
    };

    return (
        <div className="admin-food-management-conatiner">
            <p>Add Food Items In The Menu List</p>
            <button className='admin-get-food-back-but' onClick={() => navigate(-1)}>
                Click here to go back
            </button>
            <div className='admin-add-food-form-conatiner'>
                <form onSubmit={handleSubmit}>
                    <input value={name} onChange={(e) => SetName(e.target.value)} type="text" placeholder='Enter Name' />
                    <input value={desc} onChange={(e) => SetDesc(e.target.value)} type="text" placeholder='Enter Description' />
                    <input value={price} onChange={(e) => SetPrice(e.target.value)} type="number" placeholder='Enter Price' />
                    <input type="file" onChange={(e) => SetImage(e.target.files[0])} />
                    <select onChange={(e) => SetCat(e.target.value)} value={cat}>
                        <option value="">Choose Category</option>
                        <option value="Appetizer">Appetizer</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Dessert">Dessert</option>
                        <option value="Beverages">Beverages</option>
                    </select>
                    <button type="submit" disabled={loading}>
                        {loading ? "Adding..." : "Add"}
                    </button>
                </form>
            </div>
        </div>
    );
}