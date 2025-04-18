import React, { useEffect } from 'react'
import "./AdminHomePage.css"
import { Link, useNavigate } from 'react-router-dom'

export default function AdminHomePage() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("ZaykaaAdmin")) {
      navigate("/admin/login")
    }
  })

  const arr = [
    {
      title: "Click Here To Manage Existing Food Items",
      link: "/admin/getFoodItem"
    },
    {
      title: "Click Here To Add New Food Items",
      link: "/admin/addFoodItem"
    },
    {
      title: "Click Here To Manage Existing Orders",
      link: "/admin/manageOrders"
    },
    {
      title: "Click Here To View All Pervious Orders",
      link: "/admin/viewOrders"
    }
  ]

  return (
    <div className='admin-page-container'>
      <div className="admin-div-1"></div>
      <div className="admin-div-2"></div>
      <div className='admin-div-3'>
        <p>
          Welcome to <span>ADMIN Space</span>
        </p>
        <div className='admin-page-link-container'>
          {arr.map((obj, i) => {
            return (
              <div key={i}>
                <Link to={obj.link}>
                  {obj.title}
                </Link>
              </div>
            )
          })}
        </div>
        <button className='admin-page-back-but' onClick={() => {
          navigate("/")
        }} >Go Back To Home Page</button>
      </div>

      <div className="admin-home-box-1"></div>
    </div>
  )
}
