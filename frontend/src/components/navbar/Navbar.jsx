import React,{useEffect, useState} from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'

export default function Navbar({ page }) {

    const [login,SetLogin] = useState(false);

  useEffect(()=>{
    if(localStorage.getItem("Zaykaa")){
        SetLogin(true);
    }
  },[])

    return (
        <div className="navbar-container">
            <div className='navbar' >
                <ul>
                    <li>
                        {page === 'home' ?
                            <a className='navbar-link' href={'#Home'} >
                                HOME
                            </a>
                            :
                            <Link className='navbar-link' to={'/'} >
                                HOME
                            </Link>
                        }
                    </li>
                    <li>
                        {page === 'home' ?
                            <a className='navbar-link' href={'#AboutUs'} >
                                ABOUT US
                            </a>
                            :
                            <Link className='navbar-link' to={'/'} >
                                ABOUT US
                            </Link>
                        }
                    </li>
                    <li>
                        <Link className='navbar-link' to={'/menu'} >
                            MENU
                        </Link>
                    </li>
                    <li>
                        <Link className='navbar-link' to={'/cart'} >
                            CART
                        </Link>
                    </li>
                    <li>
                        <Link className='navbar-link' to={'/orders'} >
                            ORDERS
                        </Link>
                    </li>
                    <li>
                        {page === 'home' ?
                            <a className='navbar-link' href={'#ContactUs'} >
                                CONTACT US
                            </a>
                            :
                            <Link className='navbar-link' to={'/'} >
                                CONTACT US
                            </Link>
                        }
                    </li>
                    <li>
                        {login?
                        <Link className='navbar-link' to={'/logout'} >
                        LOGOUT
                    </Link>
                        :
                        <Link className='navbar-link' to={'/login'} >
                        LOGIN
                    </Link>
                        }
                    </li>
                </ul>
            </div>
            <hr />
        </div>
    )
}
