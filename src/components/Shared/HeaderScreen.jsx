import React, { useRef } from 'react'
import './styles/HeaderScreen.css'
import logo from '../../image/banner-header.png'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../../index.css'

const HeaderScreen = () => {

    const activeRoute = useSelector(state => state.activeRoute)

    const nav = useRef()
    const btnOpen = useRef()
    const btnClose = useRef()

    const navigate = useNavigate()

    const changeNav = () => {
        nav.current.classList.toggle('hidden-navbar')
        btnClose.current.classList.toggle('hidden')
        btnOpen.current.classList.toggle('hidden')
    }

    const goToHome = () => {
        navigate('/')
    }

  return (
    <header className='header'>
        <div className='card-titles'>
                <h2 onClick={goToHome} className='subtitle-header'>Tech Shop</h2>
            <h1 onClick={goToHome} className='title-header'>e-commerce</h1>
        </div>
        <nav ref={nav} className="navbar">
            <ul className="navbar__ul">
                <li className="navbar__li">
                    <NavLink to='/' className="navbar__link">
                        <i className={activeRoute === 'home' ? "active fa-solid fa-house" : "fa-solid fa-house"}></i>
                        <p>Home</p>
                    </NavLink>
                </li>
                <li className="navbar__li">
                    <NavLink to='/login' className="navbar__link">
                        <i className={activeRoute === 'login' ? "active fa-solid fa-user" : "fa-solid fa-user"}></i>
                        <p>{localStorage.getItem('token') ? 'Account' : 'Login'}</p>
                    </NavLink>
                </li>
                <li className="navbar__li">
                    <NavLink to='/purchases' className="navbar__link">
                        <i className={activeRoute === 'purchases' ? "active fa-solid fa-store" : "fa-solid fa-store"}></i>
                        <p>Purchases</p>
                    </NavLink>
                </li>
                <li className="navbar__li">
                    <NavLink to='/cart' className="navbar__link">
                        <i className={activeRoute ===  'cart' ? "fa-solid fa-cart-shopping active" : "fa-solid fa-cart-shopping"}></i>
                        <p>Cart</p>
                    </NavLink>
                </li>
            </ul>
        </nav>
        <button ref={btnOpen} onClick={changeNav} className='btn-open-navbar'><i className="fa-solid fa-bars"></i></button>
        <button ref={btnClose} onClick={changeNav} className='btn-close-navbar hidden'><i className="fa-solid fa-x"></i></button>
    </header>
  )
}

export default HeaderScreen