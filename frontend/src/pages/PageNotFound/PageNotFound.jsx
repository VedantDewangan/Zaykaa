import React from 'react'
import "./PageNotFound.css"
import Navbar from '../../components/navbar/Navbar'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="page-not-found">
      <Navbar page={"notFound"} />
      <div className="space-page-not-found"></div>
      <div className="conatiner-page-not-found">
        <p>Page Not <span>Found</span></p>
        <Link to={'/'}>/ Home /</Link>
      </div>
    </div>
  )
}
