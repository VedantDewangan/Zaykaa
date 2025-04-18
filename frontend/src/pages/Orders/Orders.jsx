import React, { useEffect, useState } from 'react'
import "./Orders.css"
import { Link } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import toast from 'react-hot-toast';
import axios from "axios"

export default function Orders() {

    const [orders,SetOrders] = useState([]);
    const [loading,SetLoading] = useState(false);

    useEffect(()=>{
        const getOrderFood = async ()=>{
            SetLoading(true);
            try {
                if(localStorage.getItem("Zaykaa")){
                    const {data} = await axios.get(`http://localhost:3000/api/order/getOrder?id=${JSON.parse(localStorage.getItem("Zaykaa")).id}`,);
                    const arr = data.order.reverse();
                    SetOrders(arr);
                }
            } catch (error) {
                console.log(error);
                toast.error("something went wrong");
            }
            SetLoading(false);
        }
        getOrderFood();
    },[])

    function convertUTCtoIST(utcDateString) {
        const utcDate = new Date(utcDateString);
        return utcDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    }
    

    return (
        <div className="orders-page">
            <Navbar page={"cart"} />
            <div className="cart-container">
                {localStorage.getItem("Zaykaa") ?
                    loading?
                    <div className="loading-section-page">Loading...</div>
                    :
                    orders.length===0?
                    <>
                    <p className='your-cart-empty'>Your Order is Empty 😔 </p>
                    <Link className='link-your-cart-empty' to={"/cart"}>Click here to go to cart</Link> 
                    </>
                    :
                    <div className="order-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>SNO</th>
                                    <th>Food Item</th>
                                    <th>Total Price</th>
                                    <th>Status</th>
                                    <th>Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((item,i)=>{
                                    return (
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>
                                            {item.foodDetail.map(obj=>{
                                                return <div key={obj._id}>
                                                    <img src={obj.foodImage} alt="" />
                                                    <p>{obj.foodName}</p>
                                                </div>
                                            })}
                                            </td>
                                            <td>₹ {item.amount}</td>
                                            <td>{item.status}</td>
                                            <td>{convertUTCtoIST(item.createdAt)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='login-conatiner-cart'>
                        <p>
                            Please <span>Login</span> To see your Order List
                        </p>
                        <Link to={'/login'}>
                            Login
                        </Link>
                    </div>
                }
            </div>
        </div>
    )
}
