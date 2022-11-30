import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setActiveCardAddProduct } from '../../store/slices/activeCardAddProduct'
import { getAllCart } from '../../store/slices/cart'
import getHeaderConfig from '../../utils/getHeaderConfig'
import CardAddProductToCart from '../Shared/CardAddProductToCart'
import './styles/Product.css'

const CardProduct = ({product, setGetProductId, setFilterProductQuantity, setCartProductPlusQuantity}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)


    const goToProduct = () => {
        navigate(`/product/${product.id}`)
    }

    const activeCardAddProductFns  = (e) => {
        e.stopPropagation()
         setGetProductId(product)
        
        if(cart){
            if(cart.length){
                const filtered = cart.filter(item => item.id === product.id)
                setFilterProductQuantity(filtered)
                if(filtered.length){
                    const obj = {
                        id: product.id,
                        newQuantity: filtered[0].productsInCart.quantity + 1
                    }
                    return axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', obj, getHeaderConfig())
                    .then(res => (
                        dispatch(setActiveCardAddProduct(true)),
                        setCartProductPlusQuantity(true),
                        console.log(res.data)),
                        dispatch(getAllCart())
                    )
                    .catch(err => console.log(err))
                }
            }              
        }

        const obj = {
            id: product.id,
            quantity: 1
        }
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', obj, getHeaderConfig() )
            .then(res => (
                console.log(res.data),
                dispatch(setActiveCardAddProduct(true)),
                dispatch(getAllCart())
            ))
            .catch(err => console.log(err))
    }


  return (
    <div>
    <article onClick={goToProduct}  className='product-card'>
        <div className='product__img'>
            <img className='product__img-back' src={product.productImgs[1]} alt="" />
            <img className='product__img-front' src={product.productImgs[0]} alt="" />
        </div>
        <div className='product__text'>
            <h4 className='product__title'> {product.title} </h4>
            <div className='product__footer'>
                <div className='product__price'>
                    <span>Price</span>
                    <p> $ {product.price} </p>
                </div>
                <button onClick={activeCardAddProductFns} className='product__btn'><i className="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>

    </article>
    </div>
  )
}

export default CardProduct