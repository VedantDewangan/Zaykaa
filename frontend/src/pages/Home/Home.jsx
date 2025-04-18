import React, { useEffect, useState } from 'react'
import "./Home.css"
import Navbar from '../../components/navbar/Navbar'
import HeroSection from '../../components/HeroSection/HeroSection'
import AboutUsSection from '../../components/AboutUsSection/AboutUsSection'
import SearchByCategory from '../../components/SearchByCategory/SearchByCategory'
import video from "../../images/home_page_video.mp4"
import AskAI from '../../components/AskAI/AskAI'
import CEO from '../../components/CEO/CEO'
import ContactUs from '../../components/ContactUs/ContactUs'

export default function Home() {

  return (
    <div className="home-page-container">
      <>
      <Navbar page={'home'} />
      <HeroSection />
      <AboutUsSection />
      <SearchByCategory />
      <video
        width="100%"
        className="home_page_video"
        autoPlay
        loop
        muted
        playsInline
        src={video}
      />
      <AskAI />
      <CEO />
      <ContactUs />
      </>
    </div>
  )
}
