import React from 'react'
import './AboutUsSection.css'
import image1 from "../../images/AboutUsImage1.jpg"
import image2 from "../../images/AboutUsImage2.jpg"
import image3 from "../../images/AboutUsImage3.jpg"
import {Link} from "react-router-dom"

export default function AboutUsSection() {
    return (
        <div id='AboutUs' className='About-Us-Conatiner'>
            <div className='About-Us-Conatiner-1'>
                <div className='About-Us-Conatiner-1-left'>
                    <div className='About-Us-Conatiner-1-left-image-container'>
                        <img src={image1} alt="" className='About-Us-Conatiner-1-left-first' />
                        <img src={image2} alt="" className='About-Us-Conatiner-1-left-second' />
                        <div className='About-Us-Conatiner-1-left-third'>
                            30 years of experience
                        </div>
                    </div>
                </div>
                <div className='About-Us-Conatiner-1-right'>
                    <p className='About-Us-Conatiner-1-right-heading'>
                        OUR COMMITMENT TO <span>AUTHENTICITY & EXCELLENCE</span>
                    </p>
                    <p className='About-Us-Conatiner-1-right-text'>
                        Every dish we create is a celebration of connection, crafted with passion and inspired by diverse flavors. Join us in an inviting space where every bite sparks joy and every moment becomes a cherished memory.
                    </p>
                    <ul className='About-Us-Conatiner-1-right-ul'>
                        <li>
                            Seasonal & Locally Sourced Ingredients
                        </li>
                        <li>
                            Vegetarian & Dietary-Friendly Options
                        </li>
                        <li>
                            Exquisite Pairings & Unique Flavors
                        </li>
                    </ul>
                    <div className='About-Us-Conatiner-1-right-button'>
                        <Link to={'/menu'}>
                            Order Now
                        </Link>
                        <a href='#ContactUs'>
                            Book A Table
                        </a>
                    </div>
                </div>
            </div>
            <hr className='about-us-hr' />
            <div className='About-Us-Conatiner-2' >
                <div className='About-Us-Conatiner-2-container'>
                    <span class="material-symbols-outlined About-Us-Conatiner-2-container-logo">
                        restaurant
                    </span>
                    <div className='About-Us-Conatiner-2-container-text'>
                        <p className='About-Us-Conatiner-2-container-text-heading'>
                            Premium Dining
                        </p>
                        <p className='About-Us-Conatiner-2-container-text-text'>
                            It's very personal, and can only be a positive experience.
                        </p>
                    </div>
                </div>
                <div className='About-Us-Conatiner-2-container'>
                    <span class="material-symbols-outlined About-Us-Conatiner-2-container-logo">
                        delivery_truck_speed
                    </span>
                    <div className='About-Us-Conatiner-2-container-text'>
                        <p className='About-Us-Conatiner-2-container-text-heading'>
                            Free Delivery
                        </p>
                        <p className='About-Us-Conatiner-2-container-text-text'>
                            It's very personal, and can only be a positive experience.
                        </p>
                    </div>
                </div>
                <div className='About-Us-Conatiner-2-container'>
                    <span class="material-symbols-outlined About-Us-Conatiner-2-container-logo">
                        paid
                    </span>
                    <div className='About-Us-Conatiner-2-container-text'>
                        <p className='About-Us-Conatiner-2-container-text-heading'>
                            Cash On Delivery
                        </p>
                        <p className='About-Us-Conatiner-2-container-text-text'>
                            It's very personal, and can only be a positive experience.
                        </p>
                    </div>
                </div>
            </div>
            <hr className='about-us-hr' />
            <div className='About-Us-Conatiner-3'>
                <div className='About-Us-Conatiner-3-right'>
                    <p className='About-Us-Conatiner-3-right-small-heading'>
                        OUR MISSION
                    </p>
                    <p className='About-Us-Conatiner-3-right-heading'>
                        CREATING MOMENTS AROUND FLAVOR
                    </p>
                    <p className='About-Us-Conatiner-3-right-text'>
                        At SpicyHunt, our vision is to redefine the dining experience by bringing people together over authentic, flavorful meals crafted with love and passion. We aim to be a beacon of culinary excellence, where every dish tells a story of tradition, innovation, and uncompromising quality.
                    </p>
                    <ul className='About-Us-Conatiner-3-right-ul'>
                        <li>
                            Delivering Unforgettable Flavors With Every Dish We Serve.
                        </li>
                        <li>
                            Creating A Welcoming Space Where Food Connects Hearts.
                        </li>
                        <li>
                            Committed To Quality, Innovation, And Exceptional Service.
                        </li>
                    </ul>
                </div>
                <div className='About-Us-Conatiner-3-left'>
                    <img src={image3} alt="" />
                </div>
            </div>
        </div>
    )
}
