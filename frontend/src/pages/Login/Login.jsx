import React, { useEffect, useState } from 'react'
import "./Login.css"
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from "axios"

export default function Login() {

  const navigate = useNavigate();
  const [loading,SetLoading] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("Zaykaa")){
      navigate("/")
    }
  },[])

  const [email,SetEmail] = useState("");
  const [password,SetPassword] = useState("");
  const [view,SetView] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(loading) return;
    SetLoading(true);
    try {
      const {data} = await axios.post("http://localhost:3000/api/user/login",{
        email:email,
        password:password
      });
      if(data.success){
        toast.success("Login Successfully");
        localStorage.setItem("Zaykaa",JSON.stringify(data.userDetails));
        navigate("/");
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    SetLoading(false);
  }

  return (
    <div className="login-page">
      <Navbar page='login' />
      <div className="login-form-container">
        <h2>LOG<span>IN</span> </h2>
        <form onSubmit={handleSubmit}>
          <input required autoComplete='off' type="email" value={email} onChange={(e)=>SetEmail(e.target.value)} placeholder='Enter Email' />
          <div className='password-container'>
            <span className='material-symbols-outlined' onClick={()=>{SetView(prev=>!prev)}} > {!view?
            'visibility'
            :
            'visibility_off'
            } </span>
          </div>
          <input required autoComplete='off' value={password} onChange={(e)=>{SetPassword(e.target.value)}} type={view?"text":"password"} placeholder='Enter Password' />
          <Link to={'/signup'}>Don't have a account?</Link>
          <button style={{
            opacity:loading?0.8:1
          }} >{loading?"Loading...":"Login"}</button>
        </form>
      </div>
    </div>
  )
}
