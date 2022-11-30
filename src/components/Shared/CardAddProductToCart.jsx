import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { setActiveCardAddProduct } from '../../store/slices/activeCardAddProduct'
import getHeaderConfig from '../../utils/getHeaderConfig'

import './styles/CardAddProductToCart.css'

const CardAddProductToCart = ({getProductId, productCounter = 1, setCartProductPlusQuantity, cartProductPlusQuantity = false, quantityInCart = null, activeRelated, setActiveRelated}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [indexClass, setIndexClass] = useState(0)



  const toClose = () => {
    dispatch(setActiveCardAddProduct(false))
    setCartProductPlusQuantity(false)
    if(activeRelated){
      setActiveRelated(false)
    }
  }
  
  const activeImg = (index) => {
    setIndexClass(index)
  }
  
  const goToCart = () => {
    dispatch(setActiveCardAddProduct(false))
    setCartProductPlusQuantity(false)
    navigate('/cart')
  }

  return (
    <div className='container-card-added-to-cart'>
      <div className='card-added-to-cart'>
            <button className='card-added-to-cart_btn-close' onClick={toClose}>x</button>

        <p className='card-added-to-cart-title'> <span className='card-added-to-cart-title-exclamacion'>&#161;</span> added to cart successfully {cartProductPlusQuantity && 'plus' + ' ' + productCounter} <span className='card-added-to-cart-title-exclamacion'>&#33;</span></p>

        <div className='card-added-to-cart__container-img'>
            <div className='card-added-to-cart__container-primary'>             
              {
                getProductId?.productImgs.map((imgs, index) => <img className={indexClass === index ? 'card-added-to-cart__img-primary active-class' : 'card-added-to-cart__img-primary'} key={imgs} src={imgs} alt="" />)
              }
            </div>
            <div className='card-added-to-cart__container-secondary'>
              {
                getProductId?.productImgs.map((imgs, index) => <img onClick={() => activeImg(index)} className={indexClass === index ? 'card-added-to-cart__img-secondary active-border-class': 'card-added-to-cart__img-secondary'} key={imgs} src={imgs} alt="" />)
              }
              
            </div>

        </div>
              
        <div className='card-added-to-cart__footer'>

          <div className='card-added-to-cart__info' >
                <p className='card-added-to-cart__info_title'> {getProductId?.title} </p>
                <div className='card-added-to-cart__info-subtitle'>
                  <span>Quantity:</span>
                < p>   {productCounter}  </p>
                </div>
                <div className='card-added-to-cart__info-subtitle'>
                  <span> price:</span>
                  <p> $ {getProductId?.price} </p>
                </div>
                {
                  cartProductPlusQuantity && <div className='card-added-to-cart__info-subtitle'>
                  <span> Quantity in cart:</span>
                  <div>
                    <p> {quantityInCart[0].productsInCart.quantity + productCounter} </p>
                  </div>
                  </div>
                }
          </div>
          <div className='card-added-to-cart__cost'>
            <div  className='d-flex-space-between'>
                <span> Total cost of products:</span>
                <div className='cart-cost_subtotal'>
                  <p>$ {(getProductId?.price * productCounter).toFixed(2)}</p>
                </div>
            </div>
            <div style={{paddingBottom: '4px', paddingTop: '4px'}} className='d-flex-space-between'>
                <span> Shipping costs</span>
                <p style={{textTransform: 'uppercase'}}>FREE</p>
            </div>
            <div  style={{borderTop: 'solid 1px rgb(59, 59, 59)', paddingTop: '4px'}} className='d-flex-space-between'>
                <span style={{fontWeight: '600'}}> Total:</span>
                <p style={{fontWeight: '500'}}>  $ {(getProductId?.price * productCounter).toFixed(2)} </p>
            </div>
            <p className='taxes-includes'> (taxes included) </p>
              <button onClick={goToCart} className='btn-go-cart'>go pay</button>
          </div>
        </div>


      </div>
    </div>
  )
}

export default CardAddProductToCart