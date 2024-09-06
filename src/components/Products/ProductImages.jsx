import React from 'react'

const ProductImages = ({img, activeImageId}) => {


  return (
    <div className={activeImageId === img.id ? `slider__container-imgs slider-active` : `slider__container-imgs`} >
        <img className='slider__img' src={img.url} loading='lazy' alt="" />
    </div>
    
  )
}

export default ProductImages