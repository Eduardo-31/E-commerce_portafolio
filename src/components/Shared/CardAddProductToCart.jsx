import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import getHeaderConfig from '../../utils/getHeaderConfig'

import './styles/CardAddProductToCart.css'

const 
CardAddProductToCart = ({productCounter = 1, productInCart, setProductInCart}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeImageId, setActiveImageId] = useState(productInCart.product.images[0].id)


  const toClose = () => setProductInCart(null)
  
  const activeImg = (id) => setActiveImageId(id)
  
  const goToCart = () => {
    setProductInCart(null)
    navigate('/cart')
  }

  return (
    <div className='container-card-added-to-cart'>
      <div className='card-added-to-cart'>
            <button className='card-added-to-cart_btn-close' onClick={toClose}>x</button>

        <p className='card-added-to-cart-title'> <span className='card-added-to-cart-title-exclamacion'>&#161;</span> successfully added to cart <span className='card-added-to-cart-title-exclamacion'>&#33;</span>  ({ ' ' + productCounter + ' '}) </p>

        <div className='card-added-to-cart__container-img'>
            <div className='card-added-to-cart__container-primary'>             
              {
                productInCart.product.images.map((img) => <img className={activeImageId === img.id ? 'card-added-to-cart__img-primary active-class' : 'card-added-to-cart__img-primary'} key={img.id} src={img.url} alt="" />)
              }
            </div>
            <div className='card-added-to-cart__container-secondary'>
              {
                productInCart.product.images.map((img) => <img onClick={() => activeImg(img.id)} className={activeImageId === img.id ? 'card-added-to-cart__img-secondary active-border-class': 'card-added-to-cart__img-secondary'} key={img.id} src={img.url} alt="" />)
              }
              
            </div>

        </div>
              
        <div className='card-added-to-cart__footer'>

          <div className='card-added-to-cart__info' >
                <p className='card-added-to-cart__info_title'> {productInCart.product.title} </p>
                <div className='card-added-to-cart__info-subtitle'>
                  <span>quantity added:</span>
                < p>   {productCounter}  </p>
                </div>
                <div className='card-added-to-cart__info-subtitle'>
                  <span> price:</span>
                  <p> $ {productInCart.product.price} </p>
                </div>
                <div className='card-added-to-cart__info-subtitle'>
                <span> Quantity in cart:</span>
                <div>
                  <p> {productInCart.quantity} </p>
                </div>
                </div>
          </div>
          <div className='card-added-to-cart__cost'>
            <div  className='d-flex-space-between'>
                <span> Total cost of products:</span>
                <div className='cart-cost_subtotal'>
                  <p>$ {(productInCart.product.price * productInCart.quantity).toFixed(2)}</p>
                </div>
            </div>
            <div style={{paddingBottom: '4px', paddingTop: '4px'}} className='d-flex-space-between'>
                <span> Shipping costs</span>
                <p style={{textTransform: 'uppercase'}}>FREE</p>
            </div>
            <div  style={{borderTop: 'solid 1px rgb(59, 59, 59)', paddingTop: '4px'}} className='d-flex-space-between'>
                <span style={{fontWeight: '600'}}> Total:</span>
                <p style={{fontWeight: '500'}}>  $ {(productInCart.product.price * productInCart.quantity).toFixed(2)} </p>
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