import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveRoute} from '../../store/slices/activeRoute'
import HeaderScreen from '../Shared/HeaderScreen'
import './styles/Login.css'

import { Navigate, useNavigate } from 'react-router-dom'


const Login = () => {

  if(localStorage.getItem('token')){
    return <Navigate to={'/account'}/>
  }

  const [invalidCredentials, setInvalidCredentials] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(setActiveRoute('login'))
  }, [])

  const saveInformationToStorage = (data) => {
    localStorage.setItem("token", data.token)
    localStorage.setItem("first_name", data.user.firstName)
    localStorage.setItem("last_name", data.user.lastName)
  }

  const submitLogin = (e) => {
    e.preventDefault()
    if(e.target.children[1].value.length && e.target.children[3].value.length){
      const email = e.target.children[1].value.toLowerCase();
      const password = e.target.children[3].value.toLowerCase();
      axios.post('https://e-commerce-api-v2.academlo.tech/api/v1/users/login', {email,password})
        .then(res => {
          saveInformationToStorage(res.data)
          navigate('/account')
        })
        .catch(err => {
          setInvalidCredentials(true)
          console.log(err)
          setTimeout(() => {
            setInvalidCredentials(false)
          }, 1600)
        })
    }
  }
        
        


  return (
    <>
      <HeaderScreen />
      <main>
        <div className='container-login'>
            <article className='login-card'>
                <div className='login__circle'>
                  <i className="fa-regular fa-user"></i>
                </div>
                <p className='login__title'>Login</p>
                <div className='login__header'>
                  <p className='login__header__title'>Test data</p>
                  <p className='login__header__subtitle'><span>Email: </span> eduardodev@gmail.com</p>
                  <p className='login__header__subtitle'><span>Password: </span> 1234</p>
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
        </div>
      </main>
    </>
  )
}

export default Login