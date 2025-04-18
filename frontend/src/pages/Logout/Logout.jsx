import React,{useEffect} from 'react'
import Navbar from '../../components/navbar/Navbar'
import "./Logout.css"
import { useNavigate } from 'react-router-dom'

export default function Logout() {

  
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("Zaykaa")){
      navigate("/")
    }
  },[])

  const handleSubmit = (e)=>{
    e.preventDefault();
    localStorage.clear();
    navigate("/")
  }

  return (
    <div className="login-page logout-page">
      <Navbar page='login' />
      <div className="login-form-container">
        <h2>LOG<span>OUT</span> </h2>
        <form onSubmit={handleSubmit}>
        <p className='logout-text'>
            Do you want to logout?
        </p>
          <button>Logout</button>
        </form>
      </div>
    </div>
  )
}
