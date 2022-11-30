import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getAll, setProduct } from '../../store/slices/product.slice'

import '../Home/styles/Product.css'
import '../Home/styles/Home.css'
import '../Home/styles/Product.css'


const ProductRelated = ({product, setCounter}) => {

    const products = useSelector(state => state.product)

    const [productFilter, setProductFilter] = useState()
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
                            <button className='product__btn'><i className="fa-solid fa-cart-shopping"></i></button>
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