import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveRoute} from '../../store/slices/activeRoute'
import HeaderScreen from '../Shared/HeaderScreen'
import './styles/Login.css'

import loggedUser from '../../image/logged-male-user.png'
import { Navigate, useNavigate } from 'react-router-dom'


const Login = () => {

  const [invalidCredentials, setInvalidCredentials] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
    useEffect(() => {
      dispatch(setActiveRoute('login'))
    }, [])

    
    const submitLogin = (e) => {
      e.preventDefault()
      if(e.target.children[1].value.length && e.target.children[3].value.length){
        const email = e.target.children[1].value.toLowerCase();
        const password = e.target.children[3].value.toLowerCase();
        //axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', {email,password})
        axios.post('https://e-commerce-api.academlo.tech/api/v1/users/login', {email,password})
        .then(res => (
          localStorage.setItem("token", res.data.data.token),
          localStorage.setItem("first_name", res.data.data.user.firstName),
          localStorage.setItem("last_name", res.data.data.user.lastName),
          console.log(res.data),
          navigate('/login')
          )
          )
          .catch(err => (
            setInvalidCredentials(true),
            console.log(err),
            setTimeout(() => {
              setInvalidCredentials(false)
            }, 1600)
            ))
          }
        }
        
        
        const sectionClose = () => {
          localStorage.removeItem('token')
          localStorage.removeItem('last_name')
          localStorage.removeItem('first_name')
          navigate('/login')
        }


      const goToShop = () => {
        navigate('/')
      }

      const goToPurchase = () => {
        navigate('/purchases')
      }

  return (
    <>
      <HeaderScreen />
      <main>
        <div className='container-login'>
          {
            !localStorage.getItem('token') ?
            <article className='login-card'>
                <div className='login__circle'>
                  <i className="fa-regular fa-user"></i>
                </div>
                <p className='login__title'>Login</p>
                <div className='login__header'>
                  <p className='login__header__title'>Test data</p>
                  <p className='login__header__subtitle'><span>Email: </span> eduardodev@gmail.com</p>
                  <p className='login__header__subtitle'><span>Password: </span> dev1234</p>
                </div>
                <form onSubmit={submitLogin} className='login__form'>
                  <label className='login__label' htmlFor="email">Email</label>
                  <input className='login__input' required id='email' type="email" />
                  <label className='login__label' htmlFor="password">Passsword</label>
                  <input className='login__input' required id='password' type="password" />
                  
                    <p className={!invalidCredentials ? 'login__invalid' : 'login__invalid login__invalid-opacity'}>Invalid Credentials...</p>
                  
                  <button className='login__btn'>Login</button>
                </form>
                <div className='login__footer'>
                  <p>Don't have an account? <span onClick={() => navigate('/register')}>Sign up</span></p>
                </div>
            </article> 
            :
            <article className='logged-card'>
              <button onClick={sectionClose} className='logged__header'><i className="fa-solid fa-right-from-bracket"></i></button>
              <p className='logged__title'>My account</p>
              <div className='logged__image'>
                <img src={loggedUser} alt="logged-user-image" />
              </div>
              <p className='logged__name'> Hi, {localStorage.getItem('first_name')} {localStorage.getItem('last_name')} </p>
              <div className='logged__footer'>
                <button onClick={goToShop} className='logged__btn-shop'>Go To Shop</button>
                <button onClick={goToPurchase} className='logged__btn-purchases'>My Purchases</button>
              </div>
            </article>
        
          }
        </div>
      </main>
    </>
  )
}

export default Login