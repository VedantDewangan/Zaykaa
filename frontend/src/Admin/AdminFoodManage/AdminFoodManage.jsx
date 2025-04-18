import React, { useState, useEffect } from 'react'
import "./AdminFoodManage.css"
import axios from 'axios'
import toast from 'react-hot-toast';

export default function AdminFoodManage() {

    const [loading, SetLoading] = useState(false);
    const [arr, SetArr] = useState([]);
    const [BestSeller, SetBestseller] = useState([]);
    const [buttonLoading,SetButtonLoading] = useState(null);
    const [buttonLoadingDelete,SetButtonLoadingDelete] = useState(null);

    useEffect(() => {
        const getAllFood = async () => {
            SetLoading(true);
            try {
                const { data } = await axios.get("http://localhost:3000/api/food/getAllFoodItems");
                SetArr(data.data)
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch food items from backend")
            }
            try {
                const { data } = await axios.get("http://localhost:3000/api/food/getAllItemFromBestseller");
                SetBestseller(data.details)
            } catch (error) {
                console.log(error);
                toast.error("Failed to fetch bestseller food items from backend")
            }
            SetLoading(false);
        }
        getAllFood();
    }, [])

    const deleteFoodItem = async (id) => {
        if(buttonLoadingDelete) return;
        SetButtonLoadingDelete(id);
        try {
            console.log(id);

            const { data } = await axios.delete("http://localhost:3000/api/food/deleteFoodItem", {
                data: { id }
            });
            if (data.success) {
                toast.success("Item deleted successfully");
                const newArr = arr.filter(obj => obj._id !== id);
                SetArr(newArr);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete item from database")
        }
        SetButtonLoadingDelete(null);
    }

    const addToBestseller = async (id) => {
        if(buttonLoading) return;
        SetButtonLoading(id);
        try {
            const { data } = await axios.post("http://localhost:3000/api/food/addToBestSeller", {
                id: id // ✅ Correctly passing `id` in the request body
            });
    
            if (data.success) {
                toast.success("Item added to bestseller");
                
                // ✅ Add new item to BestSeller state
                const newBestseller = [...BestSeller, { item: { _id: id } }];
                SetBestseller(newBestseller);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to add item to BestSeller");
        }
        SetButtonLoading(null);
    };    

    const removeFromBestseller = async (id) => {
        if(buttonLoading) return;
        SetButtonLoading(id);
        try {
            const { data } = await axios.delete("http://localhost:3000/api/food/deleteFromBestseller", {
                data: { id } // ✅ Correctly passing `id` in `data`
            });
    
            if (data.success) {
                toast.success("Item removed from bestseller");
    
                // ✅ Remove the item from the BestSeller state
                const newBestseller = BestSeller.filter(obj => obj.item._id !== id);
                SetBestseller(newBestseller);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to remove item from BestSeller");
        }
        SetButtonLoading(null);
    };
    

    return (
        <div className="admin-food-management-conatiner">
            <p>All Food Items In The Menu List</p>
            <button className='admin-get-food-back-but' onClick={() => {
                history.back();
            }}>Click here to go back</button>
            {loading ?
                <div className='loading-section-page' >
                    Loading...
                </div>
                :
                <table>
                    <thead>
                        <tr>
                            <th>SNO</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>BestSeller</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            arr ? arr.map((obj, i) => {
                                return (
                                    <tr key={obj._id}>
                                        <td>{i + 1}</td>
                                        <td>{obj.foodName}</td>
                                        <td><img src={obj.foodImage} alt="" /></td>
                                        <td>{obj.foodDescription}</td>
                                        <td>{obj.foodCategory}</td>
                                        <td>₹{obj.foodPrice}</td>
                                        <td>
                                            {BestSeller.length > 0 && BestSeller.some(item => item?.item?._id === obj._id) ? (
                                                buttonLoading===null?
                                                <button onClick={()=>{
                                                    removeFromBestseller(obj._id)
                                                }}>Remove</button>
                                                :
                                                <button onClick={()=>{
                                                    removeFromBestseller(obj._id)
                                                }}>{buttonLoading===obj._id?"Loading...":"Remove"}</button>
                                            ) : (
                                                buttonLoading===null?
                                                <button style={{ backgroundColor: "rgb(35, 255, 35)" }} onClick={()=>{
                                                    addToBestseller(obj._id)
                                                }}>Add</button>
                                                :
                                                <button style={{ backgroundColor: "rgb(35, 255, 35)" }} onClick={()=>{
                                                    addToBestseller(obj._id)
                                                }}>{buttonLoading===obj._id?"Loading...":"Add"}</button>
                                            )}
                                        </td>
                                        <td>{
                                            buttonLoadingDelete===null?
                                            <button onClick={() => { deleteFoodItem(obj._id) }} >Delete</button>
                                            :
                                            <button onClick={() => { deleteFoodItem(obj._id) }} >{buttonLoadingDelete===obj._id?"Loading...":"Delete"}</button>
                                            }</td>
                                    </tr>
                                )
                            })
                                : null
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
