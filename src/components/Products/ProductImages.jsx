import React from 'react'

const ProductImages = ({imgs, index, indexClass}) => {


  return (
    <div className={indexClass === index ? `slider__container-imgs slider-active` : `slider__container-imgs`} >
        <img className='slider__img' src={imgs} alt="" />
    </div>
    
  )
}

export default ProductImages