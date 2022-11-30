import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { setActiveCardAddProduct } from '../../store/slices/activeCardAddProduct'
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

const ProductScreen = () => {

    const {id} = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loading = useSelector(state => state.loading)
    const activeCardAddProduct = useSelector(state => state.activeCardAddProduct)
    
    const [product, setProduct] = useState()
    const [indexClass, setIndexClass] = useState(0)
    const [counter, setCounter] = useState(1)
    // 
    const [cartProductPlusQuantity, setCartProductPlusQuantity] = useState(false)
    const [filterProductQuantity, setFilterProductQuantity] = useState()
    
    const cart = useSelector(state => state.cart)

    useEffect(() => {
                dispatch(getAll())
                dispatch(getAllCart())
    }, [])

    useEffect(() => {
      axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
        .then(res => setProduct(res.data.data.product))
        .catch(err => console.log(err))
    }, [id])


    const changeClassImg = (index) => {
        setIndexClass(index)
    }

    const goToHome = () => {
        navigate('/')
    }

    const plusOne = () => setCounter(counter + 1)
    const minusOne = () => counter > 1 && setCounter(counter - 1)

    const addProductToCart = async() => {

        if(cart){
            if(cart.length){
                const filtered = cart.filter(item => item.id === product.id)
                setFilterProductQuantity(filtered)
                if(filtered.length){
                    const obj = {
                        id: product?.id,
                        newQuantity: filtered[0].productsInCart.quantity + counter
                    }
                    return await axios.patch('https://ecommerce-api-react.herokuapp.com/api/v1/cart', obj, getHeaderConfig())
                    .then(res => (
                        setCartProductPlusQuantity(true),
                        dispatch(setActiveCardAddProduct(true),
                        console.log(res.data)),
                        dispatch(getAllCart())
                    ))
                    .catch(err => console.log(err))
                    .finally(() => console.log('finnally peticion'))
                }
            }              
        }

        const obj = {
            id: product?.id,
            quantity: counter
        }
        return await axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', obj, getHeaderConfig() )
            .then(res => (
                console.log(res.data),
                dispatch(setActiveCardAddProduct(true),
                dispatch(getAllCart())
                )
            ))
            .catch(err => ( 
             console.log(err)
        ))
    }

    

  return (
    <>
    { loading && <Loading /> }
    {
    activeCardAddProduct && 
    <CardAddProductToCart 
    getProductId={product} 
    setCartProductPlusQuantity={setCartProductPlusQuantity} 
    cartProductPlusQuantity={cartProductPlusQuantity} 
    productCounter={counter} 
    quantityInCart={filterProductQuantity} 
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
                            product?.productImgs.map((imgs, index) => (
                            <ProductImages indexClass={indexClass} index={index} key={imgs} imgs={imgs}/>
                            ))
                        }
                    </div>
            
                    <div  className='slider-img-miniaturas'>

                        {
                            product?.productImgs.map((imgs, index) => (
                            <img className={indexClass === index ? 'slider-img__footer slider-active__footer' : 'slider-img__footer'} onClick={() => changeClassImg(index)} key={imgs} src={imgs}/>))
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
                    <button onClick={addProductToCart} className='product-info__btn-add-to-cart'>add to cart</button>
                </div>
            </div>
            <p className='related-product-title'>Related Products</p>
            <ProductRelated product={product} setCounter={setCounter} />
        </div>
    </main>
    <FooterScreen />
    </>
  )
}

export default ProductScreen