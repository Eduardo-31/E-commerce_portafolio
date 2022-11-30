import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCart } from '../../store/slices/cart'
import { getAll } from '../../store/slices/product.slice'
import getHeaderConfig from '../../utils/getHeaderConfig'

import './styles/CartScreen.css'

const ProductsInCart = ({product, index, indexClassBorderNone}) => {

    const dispatch = useDispatch()
    const [productImg, setProductImg] = useState()
    const [counter, setCounter] = useState(product.productsInCart.quantity)

    const getAllProducts = useSelector(state => state.product)

    useEffect(() => {
        !getAllProducts.length && dispatch(getAll())
        if(getAllProducts.length){
            const filtered = getAllProducts.filter(item => item.id  === product.id)
            setProductImg(filtered[0])
        }
    }, [getAllProducts.length])

    
        const deleteCart = () => {
            const url = `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${product.id}`
            axios.delete(url, getHeaderConfig())
                .then(res => (
                    console.log(res.data),
                    dispatch(getAllCart())
                ))
                .catch(err => console.log(err))
        }    
    

        const plusOne = () => setCounter(counter +1)
        const minusOne = () => counter > 1 && setCounter(counter -1)
          
        
 
        const changeQuantity = () => {
            const obj = {
                id: product.id,
                newQuantity: counter
            }
            axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart',obj, getHeaderConfig())
                .then(res => (
                    console.log(res.data),
                    dispatch(getAllCart())
                    ))
                .catch(err => console.log(err))
        }
            
        useEffect(() => {
          changeQuantity()
        }, [counter])
                


  return (

    <article className={index === indexClassBorderNone ? 'card-shopping-cart-product border-bottom-none' : 'card-shopping-cart-product'}>
        
        <div onClick={() => deleteCart()} className='card-shopping-product__btn-delete'>
            <button>&#88;</button> 
        </div>

        <div className='card-shopping-product__img'>
            <img src={productImg?.productImgs[0]} alt="" />
        </div>

        <p className='card-shopping-product__title'> {product.title} </p>   

        <div className='card-shopping-product__quantity'>
            <button onClick={minusOne} > &#45; </button>
            <p>  {counter} </p>
            <button onClick={plusOne}> &#43; </button>
        </div>

        <p className='card-shopping-product__price'>$ {(product.price * product.productsInCart.quantity.toString()).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") } </p>

    </article>
  )
}

export default ProductsInCart