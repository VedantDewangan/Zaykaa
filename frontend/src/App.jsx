import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import Logout from './pages/Logout/Logout'
import Menu from './pages/Menu/Menu'
import { Toaster } from 'react-hot-toast'
import AdminHomePage from './Admin/AdminHomePage/AdminHomePage'
import AdminLoginPage from './Admin/AdminLoginPage/AdminLoginPage'
import AdminFoodManage from './Admin/AdminFoodManage/AdminFoodManage'
import PageNotFound from './pages/PageNotFound/PageNotFound'
import AddFoodItem from './Admin/AddFoodItem/AddFoodItem'
import MenuOfSpecificCategory from './pages/MenuOfSpecificCategory/MenuOfSpecificCategory'
import Cart from './pages/Cart/Cart'
import Orders from './pages/Orders/Orders'
import AdminGetOrder from './Admin/AdminGetOrder/AdminGetOrder'
import AdminManageOrder from './Admin/AdminManageOrder/AdminManageOrder'
import AI from './pages/AI/AI'

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/menu/:category' element={<MenuOfSpecificCategory />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/orders' element={<Orders />} />
      <Route path='/ai' element={<AI />} />

      <Route path='/admin' element={<AdminHomePage />} />
      <Route path='/admin/login' element={<AdminLoginPage />} />
      <Route path='/admin/getFoodItem' element={<AdminFoodManage />} />
      <Route path='/admin/addFoodItem' element={<AddFoodItem />} />
      <Route path='/admin/viewOrders' element={<AdminGetOrder />} />
      <Route path='/admin/manageOrders' element={<AdminManageOrder />} />

      <Route path='*' element={<PageNotFound />} />
    </Routes>
    <Toaster toastOptions={{position:"top-right",iconTheme:"dark"}} />
    </BrowserRouter>
    </>
  )
}
