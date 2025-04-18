import React,{useEffect, useState} from 'react'
import Navbar from '../../components/navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from "axios"

export default function SignUp() {

  const navigate = useNavigate();

  const [name,Setname] = useState("");
  const [email,SetEmail] = useState("");
  const [password,SetPassword] = useState("");
  const [view,SetView] = useState(false);
  const [loading,SetLoading] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("Zaykaa")){
      navigate("/")
    }
  },[])

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(loading) return;
    SetLoading(true);
    try {
      if(password.length<=5){
        toast.error("Password should contain atleast 6 characters")
        return
      }
      const {data} = await axios.post("http://localhost:3000/api/user/register",{
        name:name,
        email:email,
        password:password
      })
      if(data.success){
        toast.success("Successfully created a account");
        localStorage.setItem("Zaykaa",JSON.stringify(data.userDetails))
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
    SetLoading(false);
  }

  return (
    <div className="login-page">
      <Navbar page='login' />
      <div className="login-form-container">
        <h2>SIGN<span>UP</span> </h2>
        <form onSubmit={handleSubmit}>
        <input required autoComplete='off' value={name} onChange={(e)=>{
          Setname(e.target.value)
        }} type="text" placeholder='Enter Name' />
        <div className='password-container'>
          </div>
          <input required autoComplete='off' value={email} onChange={(e)=>{
            SetEmail(e.target.value)
          }} type="email" placeholder='Enter Email' />
          <div className='password-container'>
            <span className='material-symbols-outlined' onClick={()=>{SetView(prev=>!prev)}} >{!view?
            'visibility'
            :
            'visibility_off'
            }</span>
          </div>
          <input value={password} required autoComplete='off' onChange={(e)=>{
            SetPassword(e.target.value)
          }} type={`${view?'text':'password'}`} placeholder='Enter Password' />
          <Link to={'/login'}>Already have a account?</Link>
          <button style={{
            opacity:loading?0.8:1
          }} >{loading?"Loading...":"Create Account"}</button>
        </form>
      </div>
    </div>
  )
}
