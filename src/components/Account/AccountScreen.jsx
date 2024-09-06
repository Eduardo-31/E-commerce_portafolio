import React, { useEffect } from 'react'

import loggedUser from '../../image/logged-male-user.png'
import HeaderScreen from '../Shared/HeaderScreen'
import FooterScreen from '../Shared/FooterScreen'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setActiveRoute } from '../../store/slices/activeRoute'
import { setPurchases } from '../../store/slices/purchases.slice'
import { setCart } from '../../store/slices/cart'

const AccountScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      dispatch(setActiveRoute('account'))
    }, [])
    

    const sectionClose = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('first_name')
        localStorage.removeItem('last_name')
        dispatch(setPurchases([]))
        dispatch(setCart([]))
        navigate('/login')
      }
    
      const goToShop = () => navigate('/')
      const goToPurchase = () => navigate('/purchases')

  return (
    <>
        <HeaderScreen />
        <main>
            <div className='container-login'>
                <article className='logged-card'>
                    <button onClick={sectionClose} className='logged__header'><i className="fa-solid fa-right-from-bracket"></i></button>
                    <p className='logged__title'>My account</p>
                    <div className='logged__image'>
                        <img src={loggedUser} alt="logged-user-image" />
                    </div>
                    <p className='logged__name'> Hi, {localStorage.getItem('first_name')} {localStorage.getItem('last_name')} </p>
                    <div className='logged__footer'>
                        <button onClick={goToShop} className='logged__btn-shop'>Go To Shop</button>
                        <button onClick={goToPurchase} className='logged__btn-purchases'>My Purchases</button>
                    </div>
                </article>
            </div>
        </main>
        <FooterScreen/>
    </>
  )
}

export default AccountScreen