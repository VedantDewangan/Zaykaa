import "./AdminLoginPage.css"
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from "react-hot-toast"
import axios from "axios"

export default function AdminLoginPage() {

    const navigate = useNavigate();
    const [email,SetEmail] = useState("");
    const [password,SetPassword] = useState("");
    const [loading,SetLoading] = useState(false);

    useEffect(()=>{
        if(localStorage.getItem("ZaykaaAdmin")){
            navigate("/admin/")
        }
    })

    const handleSubmit = async (e)=>{
        e.preventDefault();
        SetLoading(true);
        try {
            if(email!=='admin@zaykaa.com'){
                toast.error("wrong email!");
                SetLoading(false);
                return;
            }
            const {data} = await axios.post("http://localhost:3000/api/user/login",{
                email:email,
                password:password
            })
            if(data.success){
                toast.success("Welcome Admin");
                localStorage.setItem("ZaykaaAdmin",JSON.stringify(data.userDetails))
                navigate("/admin");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to login")
        }
        SetLoading(false);
    }

  return (
    <div className="container-admin-login"> 
        <div className="admin-login-page-container" style={{
        overflow:"hidden"
    }}>
            <p className="admin-login-page-container-heading">
                LOGIN <span>ADMIN</span> 
            </p>
            <form onSubmit={handleSubmit} className="admin-login-page-container-form">
                <input autoComplete="off" required value={email} onChange={(e)=>{SetEmail(e.target.value)}} type="text" placeholder='Enter admin email' />
                <input autoComplete="off" required value={password} onChange={(e)=>{SetPassword(e.target.value)}} type="password" placeholder='Enter the password' />
                <Link to={'/'}>
                Click here to go back!
                </Link>
                <button>{loading?
                "Loading..."
                :
                "Login As Admin"
                }</button>
            </form>
            <div className="login-box">

            </div>
            <div className="login-box-2">
                
            </div>
        </div>
    </div>
  )
}
