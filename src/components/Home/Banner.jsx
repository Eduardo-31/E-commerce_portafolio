import React from 'react'
import { useNavigate } from 'react-router-dom'
import './styles/HomeBanner.css'

const Banner = () => {

    const navigate = useNavigate()

    const goToProductBanner = () => {
        navigate('/product/62')
    } 

    

  return (
    <div className='banner'>
    <div className='banner__text'>
        <ul className='banner__ul'>
            <li>
                <p className='banner__title'>Iphone 12</p>
            </li>
            <li>
                <p className='banner__subtitle'>Super, Mega, Fast.</p>
            </li>
            <li>
                <button onClick={goToProductBanner} className='banner__btn'>Buy now!</button>
            </li>
        </ul>
    </div>
    <div className='banner__img'>
        <img src="https://media.revistagq.com/photos/5f5f2e8009c89c3fca5626f1/16:9/w_1280,c_limit/iphone-12.jpg" alt="" />
    </div>
</div>
  )
}

export default Banner