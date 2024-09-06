import React from 'react'

const CardPurchaseMain = ({purchased}) => {
  return (
    <div className='purchase-product'>
        <p className='purchase-product__title'> {purchased.product.title} </p>
        <p className='purchase-product__quantity'> {purchased.quantity} </p>
        <p className='purchase-product__price'> $ {purchased.product.price} </p>
    </div>
  )
}

export default CardPurchaseMain