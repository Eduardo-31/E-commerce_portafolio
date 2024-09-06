import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllCart } from '../../store/slices/cart'
import getHeaderConfig from '../../utils/getHeaderConfig'
import './styles/Product.css'
import { setLoading } from '../../store/slices/loading'

const CardProduct = ({product, setProductInCart}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const goToProduct = () => {
        navigate(`/product/${product.id}`)
    }

    const addToCartRequest = (method, obj, cartId=null) => {
        dispatch(setLoading(true))
        let url = 'https://e-commerce-api-v2.academlo.tech/api/v1/cart/'
            if(cartId){
                url += cartId
            }
            axios[method](url, obj, getHeaderConfig())
            .then(res => {  
                dispatch(getAllCart())
                setProductInCart(() =>{
                    const newState = {...res.data}
                    newState.product = product
                    return newState
                })
            })
        .catch(err => console.log(err))
        .finally(() => dispatch(setLoading(false)))
    }

    const addProductToCart  = (e) => {
        e.stopPropagation()
        if(!localStorage.getItem('token')){
            return navigate('/login')
        }
        
        if(cart.length){
            const filtered = cart.filter(item => item.productId === product.id)
            if(filtered.length){
                const cartId = filtered[0].id
                const obj = {
                    quantity: filtered[0].quantity + 1
                }
                addToCartRequest('put', obj, cartId)
                return
            }
        }

        const obj = {
            productId: product.id,
            quantity: 1
        }
        addToCartRequest('post',obj)
        return
    }

  return (
    <div>
    <article onClick={goToProduct}  className='product-card'>
        <div className='product__img'>
            <img className='product__img-back' src={product.images[1].url} alt="" />
            <img className='product__img-front' src={product.images[0].url} alt="" />
        </div>
        <div className='product__text'>
            <h4 className='product__title'> {product.title} </h4>
            <div className='product__footer'>
                <div className='product__price'>
                    <span>Price</span>
                    <p> $ {product.price} </p>
                </div>
                <button onClick={addProductToCart} className='product__btn'><i className="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
    </article>
    </div>
  )
}

export default CardProduct