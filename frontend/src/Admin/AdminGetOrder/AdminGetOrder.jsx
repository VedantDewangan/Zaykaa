import React, { useState, useEffect } from 'react'
import "./AdminGetOrder.css"
import axios from 'axios'
import toast from 'react-hot-toast';

export default function AdminGetOrder() {

    const [loading, SetLoading] = useState(false);
    const [arr, SetArr] = useState([]);

    useEffect(() => {
        const getOrder = async ()=>{
            SetLoading(true);
            try {
                const {data} = await axios.get("http://localhost:3000/api/order/getAdminOrder");
                console.log(data);
                SetArr(data.order);
            } catch (error) {
                console.log(error);
                toast.error("something went wrong!!")
            }
            SetLoading(false);
        }

        getOrder();
    }, [])

    function convertUTCtoIST(utcDateString) {
        const utcDate = new Date(utcDateString);
        return utcDate.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    }
    

    return (
        <div className="admin-food-management-conatiner">
            <p>All Pervious Orders Items</p>
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
                            <th>User Detail</th>
                            <th>Food Detail</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Order Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {arr.length===0?
                        <p>No Previous Order</p>
                        :
                        arr.map((item,i)=>{
                            return <tr key={i}>
                                <td>{i+1}</td>
                                <td>
                                    <div>
                                        <div>Name : {item.userDetail.userName}</div>
                                        <div>Email : {item.userDetail.userEmail}</div>
                                    </div>
                                </td>
                                <td>
                                    {item.foodDetail.map((obj)=>{
                                        return <div key={obj._id}>
                                            <img src={obj.foodImage} alt="" />
                                            <div>{obj.foodName}</div>
                                        </div>
                                    })}
                                </td>
                                <td>₹{item.amount}</td>
                                <td>{item.status}</td>
                                <td>{convertUTCtoIST(item.createdAt)}</td>
                            </tr>
                        })
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}
