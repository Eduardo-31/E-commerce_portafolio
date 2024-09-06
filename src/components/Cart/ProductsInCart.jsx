import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCart } from '../../store/slices/cart'
import { getAll } from '../../store/slices/product.slice'
import getHeaderConfig from '../../utils/getHeaderConfig'

import './styles/CartScreen.css'

const ProductsInCart = ({cart, index, indexClassBorderNone}) => {

    const [counter, setCounter] = useState(cart.quantity)
    const [timer, setTimer] = useState(null);
    
    const dispatch = useDispatch()

    
        const deleteCart = () => {
            const url = `https://e-commerce-api-v2.academlo.tech/api/v1/cart/${cart.id}`
            axios.delete(url, getHeaderConfig())
                .then(res => dispatch(getAllCart()))
                .catch(err => console.log(err))
        }    
    

        const plusOne = () => {
            if(counter < 15){
                setCounter(counter +1)
                changeQuantity(counter + 1)
            }
        }
        const minusOne = () => {
            if(counter > 1) {
                setCounter(counter - 1)
                changeQuantity(counter - 1)
            }
        }
 
        const changeQuantity = (counter) => {
            if(timer)clearTimeout(timer)
            setTimer(
                setTimeout(() => {
                  //onQuantityUpdate(newQuantity); // Envía la petición PUT al servidor
                  const obj = {
                      quantity: counter
                  }
                  axios.put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${cart.id}`, obj, getHeaderConfig())
                      .then(res => dispatch(getAllCart()))
                      .catch(err => console.log(err))
                }, 500) // Espera 500 ms después del último clic
            );
        }           
            
  return (

    <article className={index === indexClassBorderNone ? 'card-shopping-cart-product border-bottom-none' : 'card-shopping-cart-product'}>
        
        <div onClick={deleteCart} className='card-shopping-product__btn-delete'>
            <button>&#88;</button> 
        </div>

        <div className='card-shopping-product__img'>
            <img src={cart.product.images[0].url} alt="" />
        </div>

        <p className='card-shopping-product__title'> {cart.product.title} </p>   

        <div className='card-shopping-product__quantity'>
            <button onClick={minusOne} > &#45; </button>
            <p>  {counter} </p>
            <button onClick={plusOne}> &#43; </button>
        </div>
        
        <p className='card-shopping-product__price'>$ {(cart.product.price * cart.quantity).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") } </p>

    </article>
  )
}

export default ProductsInCart