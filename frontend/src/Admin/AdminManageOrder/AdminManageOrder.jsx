import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./AdminManageOrder.css";

export default function AdminManageOrder() {
    const [loading, setLoading] = useState(false);
    const [arr, setArr] = useState([]);

    useEffect(() => {
        const getOrder = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get("http://localhost:3000/api/order/getNotDeliveredFood");
                console.log(data);
                setArr(data.order);
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong!!");
            } finally {
                setLoading(false);
            }
        };

        getOrder();
    }, []);

    const updateOrder = async (id, currentStatus) => {
        try {
            let newStatus;
            let deliveryStatus = false;

            if (currentStatus === "Preparing Food") {
                newStatus = "Out For Delivery";
            } else if (currentStatus === "Out For Delivery") {
                newStatus = "Delivered";
                deliveryStatus = true;
            } else {
                console.log("Invalid status for update:", currentStatus);
                return;
            }

            const { data } = await axios.put("http://localhost:3000/api/order/updateOrder", {
                id: id,
                NewStatus: newStatus,
                delivery: deliveryStatus
            });

            console.log("Order Update Response:", data);
            toast.success(`Order status updated to ${newStatus}`);

            // Remove the order from array if it's delivered
            if (newStatus === "Delivered") {
                setArr(prevArr => prevArr.filter(order => order._id !== id));
            } else {
                // Otherwise, update the status in the array
                setArr(prevArr => 
                    prevArr.map(order => 
                        order._id === id ? { ...order, status: newStatus } : order
                    )
                );
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status");
        }
    };

    return (
        <div className="order-management-conatiner">
            <p className='heading-order-manage'>Manage Orders</p>
            <button className='admin-get-food-back-but' onClick={() => history.back()}>
                Click here to go back
            </button>

            {loading ? (
                <div className='loading-section-page' >Loading...</div>
            ) : arr.length === 0 ? (
                <p>No New Orders</p>
            ) : (
                <div className="order-manage-container">
                    {arr.map((obj, i) => (
                        <div key={i} className='each-order-container'>
                            <div className='each-order'>
                                <div className='each-order-first'>
                                    <div className='each-order-user-details'>
                                        <p>User Details</p>
                                        <p>Name : {obj.userDetail.userName}</p>
                                        <p>Email : {obj.userDetail.userEmail}</p>
                                    </div>
                                    <div>
                                        <p>Amount : ₹{obj.amount}</p>
                                    </div>
                                </div>
                                <div className='each-order-status-details'>
                                    <p>Status</p>
                                    <p>{obj.status}</p>
                                    <button onClick={() => updateOrder(obj._id, obj.status)}>
                                        Next
                                    </button>
                                </div>
                            </div>
                            <div>
                                <p>Food Details</p>
                                <div className='each-order-food-item-con'>
                                    {obj.foodDetail.map((item, index) => (
                                        <div key={index} className='each-order-food-item'>
                                            <img src={item.foodImage} alt="" />
                                            <p>{item.foodName}</p>
                                            <p>₹{item.foodPrice}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}