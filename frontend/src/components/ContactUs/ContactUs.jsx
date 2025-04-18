import React from 'react'
import './ContactUs.css'
import {Link} from "react-router-dom"
import {toast} from "react-hot-toast"

export default function ContactUs() {

  const handleSubmit = (e)=>{
    e.preventDefault();
    toast.error("We are not accepecting the booking right now!!")
  }

  return (
    <div id='ContactUs' className="contact-us-container" >
      <div className="contact-us-first">
        <div className='contact-us-first-left'>
          <p className='contact-us-first-left-small-heading'>
            RESERVE A TABLE
          </p>
          <p className='contact-us-first-left-heading'>RESERVE NOW YOUR TABLE AND <span>ENJOY DINING EXPERIENCE.</span></p>
          <p className='contact-us-first-left-hrs' >Open Hours</p>
          <p className='contact-us-first-left-hrs-2'>
            10:00 AM - 09.00 PM
          </p>
        </div>
        <div className='contact-us-first-right'>
          <form className='contact-us-first-right-form' onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Your Name' />
            <input type="email" placeholder='Enter Your Email' />
            <input type="number" placeholder='Enter Your Phone Number' />
            <input type="date" />
            <input type="number" placeholder='Enter Number Of People' />
            <select>
              <option value="">Choose Time</option>
              <option value="">10:00AM - 11:00AM</option>
              <option value="">11:00AM - 12:00PM</option>
              <option value="">12:00PM - 01:00PM</option>
              <option value="">01:00PM - 02:00PM</option>
              <option value="">02:00PM - 03:00PM</option>
              <option value="">03:00PM - 04:00PM</option>
              <option value="">04:00PM - 05:00PM</option>
              <option value="">05:00PM - 06:00PM</option>
              <option value="">06:00PM - 07:00PM</option>
              <option value="">07:00PM - 08:00PM</option>
            </select>
            <button type='submit'>Book Table</button>
          </form>
        </div>
      </div>
      <div className="contact-us-second">
        <p className='contact-us-second-heading'>Zay<span>Kaa</span> </p>
        <p className='contact-us-second-tagline'>where every bite is a delight</p>
        <p className='location-phone-number'>Navi Mumbai, Maharastra , India</p>
        <p className='location-phone-number'>+91 12345 67890</p>
        <Link to={"/admin"} className='admin-link'>Click Here For Admin Page</Link>
        <div className='contact-us-second-links'>
          <ul>
            <li>
              <Link>Insta</Link>
            </li>
            <li>
              <Link>Twitter</Link>
            </li>
            <li>
              <Link>Facebook</Link>
            </li>
            <li>
              <Link>Youtube</Link>
            </li>
          </ul>
        </div>
        <hr />
        <p className='contact-us-second-copyright'>Copyright © 2025 All Rights Reserved.</p>
      </div>
    </div>
  )
}
