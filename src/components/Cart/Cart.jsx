import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setActiveRoute } from '../../store/slices/activeRoute'
import { getAllCart, setCart } from '../../store/slices/cart'
import getHeaderConfig from '../../utils/getHeaderConfig'
import ProductsInCart from './ProductsInCart'
import Loading from '../Shared/Loading'
import HeaderScreen from '../Shared/HeaderScreen'
import FooterScreen from '../Shared/FooterScreen'
import { getAllPurchases } from '../../store/slices/purchases.slice'

const Cart = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const cart = useSelector(state => state.cart)
    const loading = useSelector(state => state.loading)

    useEffect(() => {
      dispatch(setActiveRoute('cart'))
      !cart.length && dispatch(getAllCart()) 
    }, [])
    
    

    let totaled = 0
    let items = 0
    if(cart){
      const cb = (acc, current) => (acc + (current.product.price * current.quantity))
      totaled = cart.reduce(cb, 0)
      const cbItems = (acc, current) => (acc + current.quantity)
      items = cart.reduce(cbItems, 0)
    }


    
    const indexClassBorderNone = cart?.length -1

    const toPay = () => {
        const destiny = {
          "street": "Green St. 1456",
          "colony": "Southwest",
          "zipCode": 12345,
          "city": "USA",
          "references": "Some references"
      }
      
      const url = 'https://e-commerce-api-v2.academlo.tech/api/v1/purchases'
      axios.post(url,destiny, getHeaderConfig())
        .then(res => (
            console.log(res.data),
            dispatch(setCart([])),
            dispatch(getAllPurchases())
          ))
        .catch(err => console.log(err))
    }


  return (
    <>
      {
        loading && !items  ?
          <Loading />
        :
        <>
         { loading &&  <Loading /> }
        <HeaderScreen />
        <main>
          
            <div className='container-shopping-cart'>
            <div className='container-cart-title'>
              <p className='cart-title'>shopping cart</p>
              <span className='cart-signo'>&#62;</span>
              <span  className='cart-items'> {items} items</span>
            </div>
            <div className='line-header-cart'>
            </div>
            
            <div className='container-grid-shooping'>
                <div>
                {
                  cart?.length ?
                    cart?.map((product, index) => <ProductsInCart index={index} indexClassBorderNone={indexClassBorderNone} key={product.id} cart={product} />)
                  :
                    <div className='cart-items-null'>
                      <p>You have not registered any products in your shopping cart (items 0), click <span onClick={() => navigate('/')} className='goToHome'>here</span> to register products.</p>
                    </div>
                } 
              </div>

              <div className='cart-footer' >
                <div className='cart-footer_order-sumary' >
                  <div className='order-sumary'>
                    <p> Subtotal</p>
                    <p>$ {totaled.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} </p>
                  </div>
                  <div className='order-sumary'>
                    <p> Shipping costs</p>
                    <p> FREE</p>
                  </div>
                  <div className='order-sumary-line'></div>
                    <div className='order-sumary-total'>
                      <p> TOTAL</p>
                      <p>$ {totaled.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} </p>
                    </div>
                    <button onClick={toPay} className={items ? 'order-sumary-btn' : 'order-sumary-btn place_order-null'}>CHECKOUT</button>
                  
                </div>

              </div>

            </div>
          </div> 
        
          
        </main>
        <FooterScreen />
        </>
      }
    </>
  )
}

export default Cart