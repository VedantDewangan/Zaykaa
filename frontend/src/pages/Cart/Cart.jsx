import React, { useEffect, useState } from "react";
import "./Cart.css";
import Navbar from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);
    const [loadingPayment, setLoadingPayment] = useState(false);
    const [bill, setBill] = useState(0);
    const [gst, setGst] = useState(0);
    const [totalAmt, setTotalAmt] = useState(0);
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("Zaykaa"));

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() => {
        calculateBill();
    }, [cart]);

    const fetchCartItems = async () => {
        setLoadingPage(true);
        try {
            if (user) {
                const { data } = await axios.get(`http://localhost:3000/api/cart/getItemsInCart?userID=${user.id}`);
                setCart(data.cart);
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching cart items");
        }
        setLoadingPage(false);
    };

    const calculateBill = () => {
        const subtotal = cart.reduce((sum, item) => sum + (item.quantity * item.itemDetails.foodPrice), 0);
        const tax = Math.round((subtotal * 18) / 100);
        setBill(subtotal);
        setGst(tax);
        setTotalAmt(subtotal + tax);
    };

    const [removingItemId, setRemovingItemId] = useState(null);

    const removeFromCart = async (id) => {
        try {
            setRemovingItemId(id);
            await axios.delete("http://localhost:3000/api/cart/removeItemInCart", {
                data: {
                    userID: JSON.parse(localStorage.getItem("Zaykaa")).id,
                    itemID: id
                }
            });
            toast.success("Item removed successfully");
            setCart(prevCart => prevCart.filter(obj => obj.itemDetails._id !== id));
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
        setRemovingItemId(null);
    }


    const placeOrder = async () => {
        setLoadingPayment(true);
        try {
            if (!user) {
                toast.error("User not logged in");
                setLoadingPayment(false);
                return;
            }

            const { data: orderData } = await axios.post("http://localhost:3000/create-paypal-order", {
                totalAmount: totalAmt
            });

            if (!orderData.success) {
                toast.error("Failed to create PayPal order");
                setLoadingPayment(false);
                return;
            }

            window.paypal.Buttons({
                createOrder: () => orderData.orderID,
                onApprove: async (data, actions) => {
                    try {
                        const capture = await actions.order.capture();
                        if (capture.status === "COMPLETED") {
                            const verifyResponse = await axios.post("http://localhost:3000/paypal-transaction-complete", {
                                orderID: orderData.orderID
                            });

                            if (verifyResponse.data.success) {
                                await axios.post("http://localhost:3000/api/order/placeOrder", {
                                    userId: user.id,
                                    cart: cart,
                                    amt: totalAmt
                                });
                                navigate("/orders");
                                toast.success("Order placed successfully!");
                            } else {
                                toast.error("Payment verification failed");
                            }
                        } else {
                            toast.error("Payment not completed");
                        }
                    } catch (error) {
                        console.error(error);
                        toast.error("Something went wrong during payment");
                    }
                },
                onError: (err) => {
                    console.error(err);
                    toast.error("Payment error");
                }
            }).render("#paypal-button-container");
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
        setLoadingPayment(false);
    };

    return (
        <div className="cart-page-conatiner">
            <Navbar page="cart" />
            <div className="cart-container">
                {user ? (
                    <div className="cart-after-login-conatiner">
                        {loadingPage ? (
                            <div className="loading-section-page">Loading...</div>
                        ) : cart.length > 0 ? (
                            <div className="cart-table-container">
                                <table className="cart-table">
                                    <thead>
                                        <tr>
                                            <th>SNO</th>
                                            <th>NAME</th>
                                            <th>IMAGE</th>
                                            <th>PRICE</th>
                                            <th>REMOVE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((item, index) => (
                                            <tr key={item.itemDetails._id}>
                                                <td>{index + 1}</td>
                                                <td>{item.itemDetails.foodName}</td>
                                                <td><img src={item.itemDetails.foodImage} alt={item.itemDetails.foodName} /></td>
                                                <td>₹{item.itemDetails.foodPrice}</td>
                                                <td>
                                                    <div>
                                                        <button
                                                            onClick={() => removeFromCart(item.itemDetails._id)}
                                                            disabled={removingItemId === item.itemDetails._id}
                                                        >
                                                            {removingItemId === item.itemDetails._id ? "Removing..." : "Remove"}
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="bill-container">
                                    <div><p>Bill</p><p>: ₹{bill}</p></div>
                                    <div><p>GST (18%)</p><p>: ₹{gst}</p></div>
                                    <div><p>Total Amount</p><p>: ₹{totalAmt}</p></div>
                                </div>

                                <button className="place-order-but" onClick={placeOrder} disabled={loadingPayment}>
                                    {loadingPayment ? "Processing Payment..." : "Place Order"}
                                </button>
                                <div id="paypal-button-container"></div>
                            </div>
                        ) : (
                            <div className="empty-cart">
                                <p className="your-cart-empty">Your Cart is Empty 😔</p>
                                <Link className="link-your-cart-empty" to="/menu">Click here to add items</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="login-conatiner-cart">
                        <p>Please <span>Login</span> to see your cart</p>
                        <Link to="/login">Login</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
