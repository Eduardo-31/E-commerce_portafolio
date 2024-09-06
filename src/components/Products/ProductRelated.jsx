import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProductRelated = ({product, setCounter, addProductToCart}) => {

    
    const [similarProducts, setSimilarProducts] = useState()

    const navigate = useNavigate()
    const allProducts = useSelector(state => state.product)  

    useEffect(() => {
        const filtered = allProducts.filter(item =>  item.category.name === product.category.name && item.title !== product.title)
        setSimilarProducts(filtered)
    }, [product])

    
    const goToProductID = (id) => {
        navigate(`/product/${id}`)
        setCounter(1)
    }


  return (
    <div className='section-products'>
        {
            similarProducts?.map(product => (
                <article key={product.id} onClick={() => goToProductID(product.id)} className='product-card'>
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
                            <button onClick={(e) => {
                                    e.stopPropagation()
                                    addProductToCart(product)
                                }} className='product__btn'><i className="fa-solid fa-cart-shopping"></i>
                            </button>
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