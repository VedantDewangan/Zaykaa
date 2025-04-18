import React from 'react'
import "./HeroSection.css"
import image from "../../images/heroSectionRightImage.jpg"

export default function HeroSection() {
  return (
    <div id='Home' className="hero-section-container">
      <div className='hero-section-left'>
        <p className='hero-section-left-heading'>
          Zay<span>kaa</span>
        </p>
        <p className='hero-section-left-tagline'>
          where every bite is a delight
        </p>
        <p className='hero-section-left-text'>
        Immerse yourself in a dining experience like no other, where every dish is a masterpiece of flavor, crafted with care and precision. From the freshest ingredients.
        </p>
        <a className='hero-section-left-button' href='#ContactUs'>
          Book A Table
        </a>
      </div>
      <div className='hero-section-right'>
        <img src={image} alt="" />
      </div>
    </div>

  )
}
