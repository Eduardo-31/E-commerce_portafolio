import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAll, setProduct } from '../../store/slices/product.slice'

import '../Home/styles/Product.css'
import '../Home/styles/Home.css'
import '../Home/styles/Product.css'
import { getAllCart } from '../../store/slices/cart'
import { setActiveCardAddProduct } from '../../store/slices/activeCardAddProduct'
import getHeaderConfig from '../../utils/getHeaderConfig'


const ProductRelated = ({product, setCounter, setFilterProductQuantity, setActiveRelated, setCartProductPlusQuantity, setProductRelated}) => {

    
    const [productFilter, setProductFilter] = useState()
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const allProducts = useSelector(state => state.product)  


    useEffect(() => {
        if(allProducts.length){

            const filtered = allProducts.filter(item =>  item.category.name === product?.category && item.title !== product?.title)
            setProductFilter(filtered)
        }     
       
    }, [ product, allProducts.length ])

    
    const goToProductID = (id) => {
        navigate(`/product/${id}`)
        setCounter(1)
    }


    const addProductToCart = (relatedProduct) => {
        setCounter(1)
        if(!localStorage.getItem('token')){
            return navigate('/login')
        }
        setActiveRelated(true)
        setProductRelated(relatedProduct)
        if(cart){
            if(cart.length){
                const filtered = cart.filter(item => item.id === relatedProduct.id)
                setFilterProductQuantity(filtered)
                if(filtered.length){
                    const obj = {
                        id: relatedProduct.id,
                        newQuantity: filtered[0].productsInCart.quantity + 1
                    }
                    //return axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', obj, getHeaderConfig())
                    return axios.patch('https://e-commerce-api.academlo.tech/api/v1/cart', obj, getHeaderConfig())
                    .then(res => (
                        setCartProductPlusQuantity(true),
                        dispatch(setActiveCardAddProduct(true)),
                        console.log(res.data),
                        dispatch(getAllCart())
                    ))
                    .catch(err => console.log(err))
                }
            }              
        }
        const obj = {
            id: relatedProduct.id,
            quantity: 1
        }
        //return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', obj, getHeaderConfig() )
        return axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', obj, getHeaderConfig() )
            .then(res => (
                console.log(res.data),
                dispatch(setActiveCardAddProduct(true)),
                dispatch(getAllCart())
            ))
            .catch(err => ( 
             console.log(err)
        ))
    }  



  return (
    <div className='section-products'>
        {
            productFilter?.map(product => (
                <article key={product.id} onClick={() => goToProductID(product.id)} className='product-card'>
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
                            <button onClick={(e) => (e.stopPropagation(), addProductToCart(product))} className='product__btn'><i className="fa-solid fa-cart-shopping"></i></button>
                        </div>
                    </div>
                </article>
            ))
        }
        <article></article>
    </div>
  )
}

export default ProductRelated