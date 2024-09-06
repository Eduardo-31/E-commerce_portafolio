import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllCart } from '../../store/slices/cart'
import { getAll } from '../../store/slices/product.slice'
import getHeaderConfig from '../../utils/getHeaderConfig'
import CardAddProductToCart from '../Shared/CardAddProductToCart'
import FooterScreen from '../Shared/FooterScreen'
import HeaderScreen from '../Shared/HeaderScreen'
import Loading from '../Shared/Loading'
import ProductImages from './ProductImages'
import ProductRelated from './ProductRelated'

import './styles/ProductScreen.css'
import { setLoading } from '../../store/slices/loading'
import { useRef } from 'react'

const ProductScreen = () => {

    const [product, setProduct] = useState()
    const [activeImageId, setActiveImageId] = useState(null)
    const [counter, setCounter] = useState(1)

    const selectedScrollY = useRef(null)
    const [productInCart, setProductInCart] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const allProducts = useSelector(state => state.product)  
    const loading = useSelector(state => state.loading)
    const cart = useSelector(state => state.cart)

    const {id} = useParams()
    
    useEffect(() => {
        const handleScroll = () => {
            selectedScrollY.current = window.scrollY
        };
        window.addEventListener('scroll', handleScroll);
        if(selectedScrollY.current) window.scrollTo({top: 0, behavior: 'smooth'})

        if(!allProducts.length){
            dispatch(getAll())
        } 
        dispatch(setLoading(true))
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
        .then(res => {
            setActiveImageId(res.data.images[0].id)
            setProduct(res.data)
        })
        .catch(err => console.log(err))
        .finally(() => dispatch(setLoading(false)))
        
        // Limpia el listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [id])


    const addToCartRequest = (product, method, obj, cartId=null) => {
        dispatch(setLoading(true))
        let url = 'https://e-commerce-api-v2.academlo.tech/api/v1/cart/'
            if(cartId){
                url += cartId
            }
            axios[method](url, obj, getHeaderConfig())
            .then(res => {
                dispatch(getAllCart())
                // show aggregate information
                setProductInCart(() =>{
                    const newState = {...res.data}
                    newState.product = product
                    return newState
                })
            })
        .catch(err => console.log(err))
        .finally(() => console.log(dispatch(setLoading(false))))
    }

    const addProductToCart = (product, count=null) => {
        
        if(!localStorage.getItem('token')){
            return navigate('/login')
        }
        if(!count){
            setCounter(1)
        }

        if(cart.length){
            const filtered = cart.filter(item => item.productId === product.id)
            if(filtered.length){
                const cartId = filtered[0].id
                const obj = {
                    quantity: filtered[0].quantity + (count || 1)
                }
                
                addToCartRequest(product, 'put', obj, cartId)
                return
            }   
        }        
        const obj = {
            productId: product.id,
            quantity: (count || 1)
        }

        addToCartRequest(product, 'post', obj)
        return
    }

    const changeClassImg = (id) => setActiveImageId(id)

    const goToHome = () => navigate('/')

    const plusOne = () => counter < 10 && setCounter(counter + 1)
    const minusOne = () => counter > 1 && setCounter(counter - 1)

    return (
        <>
        {
            loading && !product ?
            <Loading />
            :
            <>
            {
                loading &&
                <Loading />
            }
            {
                productInCart && 
                <CardAddProductToCart 
                productCounter={counter}
                productInCart={productInCart}
                setProductInCart={setProductInCart}
                />  
            }
                <HeaderScreen />
                    <main>
                        <div className='container-product-screen'>
                            <div className='product-screen-header'>
                                <p onClick={goToHome} className='product-screen-header__home'>Home</p>
                                <span className='product-screen-header__span'>&#62; </span>
                                <p className='product-screen-header__name'>{ product?.title} </p>
                            </div>
                            <div className='container-product-header'>     
                                <div className='container-slider'>
                                    <div className='slider'>
                                        {
                                            product?.images.map((img) => (
                                                <ProductImages key={img.id} img={img} activeImageId={activeImageId}/>
                                            ))
                                        }
                                    </div>
                            
                                    <div  className='slider-img-miniaturas'>

                                        {
                                            product?.images.map((img) => (
                                            <img className={activeImageId === img.id ? 'slider-img__footer slider-active__footer' : 'slider-img__footer'} onClick={() => changeClassImg(img.id)} key={img.id} src={img.url} loading='lazy'/>))
                                        }
                                    </div>
                                </div>
                                <div className='container-product-info'>
                                    <p className='product-info__title'> {product?.title} </p>
                                    <p className='product-info__description'> {product?.description} </p>
                                    <span className='product-info__price'>$ {product?.price} </span>    
                                    <div className='product-info__counter'>
                                        <button className='product-info__btn' onClick={minusOne}>&#45;</button>
                                        <label className='product-info__btn-index'> {counter} </label>
                                        <button className='product-info__btn' onClick={plusOne}>&#43;</button>
                                    </div>
                                    <button onClick={() => addProductToCart(product, counter)} className='product-info__btn-add-to-cart'>add to cart</button>
                                </div>
                            </div>
                            {
                                (product && allProducts.length) &&
                                <>
                                    <p className='related-product-title'>Related Products</p>
                                    <ProductRelated product={product} setCounter={setCounter} addProductToCart={addProductToCart} />
                                </>
                            }
                        </div>
                    </main>
                <FooterScreen />
            </>
        }
        </>
    )
}

export default ProductScreen