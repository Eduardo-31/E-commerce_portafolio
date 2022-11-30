import React from 'react'

const CardPurchaseMain = ({purchased}) => {
  return (
    <div className='purchase-product'>
        <p className='purchase-product__title'> {purchased.title} </p>
        <p className='purchase-product__quantity'> {purchased.productsInCart.quantity} </p>
        <p className='purchase-product__price'> $ {purchased.price} </p>
    </div>
  )
}

export default CardPurchaseMain