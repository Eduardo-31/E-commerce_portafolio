import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setActiveRoute } from '../../store/slices/activeRoute'
import HeaderScreen from '../Shared/HeaderScreen'
import '../Login/styles/Login.css'
import './styles/RegisterScreen.css'
import axios from 'axios'

const RegisterScreen = () => {


    const [createUser, setCreateUser] = useState(false)
    const [errorCreate, setErrorCreate] = useState(null)
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
      useEffect(() => {
        dispatch(setActiveRoute('register'))
      }, [])
 
    const loginIn = (email, password) => {
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login',{email, password})
            .then(res => (
                localStorage.setItem('token', res.data.data.token),
                console.log(res.data)
                ))
            .catch(err => console.log(err))
    }

       

      const register = (e) => {
        e.preventDefault()
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const email = e.target.email.value
        const password = e.target.password.value

            if(firstName.length && lastName.length && email.length && password.length){
            const data = {
                firstName,
                lastName,
                email,
                password,
                phone: "1234567891",
                role: "admin"
            }

                if(localStorage.getItem("token")) {                
                return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users', data)
                .then(res => (
                    console.log(res.data),
                    setCreateUser(true),
                    console.log('afuera con localstorage'),
                    setTimeout(() => {
                            console.log('adentro con local storage')
                            setCreateUser(false)
                        }, 4200))
                    )
                  .catch(err => (
                    console.log(err),
                    setErrorCreate(err.response.data.message),
                    setTimeout(() => {
                        setErrorCreate(false)
                    }, 2800)
                    ))
                }
                
                
                return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users', data)
                .then(res => (
                  localStorage.setItem("token", res.data.data.token),
                  localStorage.setItem("first_name", res.data.data.user.firstName),
                  localStorage.setItem("last_name", res.data.data.user.lastName),
                  setCreateUser(true),
                  console.log(res.data),
                  loginIn(email, password),
                  setTimeout(() => {
                      navigate('/login')
                      setCreateUser(false)
                      console.log('setTimeout')
                  }, 3600)
                  )
                  )
                  .catch(err => (
                    console.log(err),
                    setErrorCreate(err.response.data.message),
                    setTimeout(() => {
                        setErrorCreate(false)
                    }, 2800)
                    ))
            }

      }
  


  return (

    <>
        <HeaderScreen />
        <main>
            <div className='container-register'>
            
                
                <article className='register-card'>
                    <div className='login__circle'>
                    <i className="fa-regular fa-user"></i>
                    </div>
                    <p className='register__title'>Create Account</p>
                    <div className='container-card-create'>
                        <div className={createUser ? 'card-create card-create-active' : 'card-create'}>
                            <p>successfully created</p>
                            <a><i className="fa-solid fa-circle-check"></i></a>
                        </div>
                    </div>
                    <form onSubmit={register} className='register__form'>
                    <label className='login__label' htmlFor="first_name">First Name</label>
                    <input name='firstName' className='login__input' required id='first_name' type="text" />
                    <label className='login__label' htmlFor="last_name">Last Name</label>
                    <input name='lastName' className='login__input' required id='last_name' type="text" />
                    <label className='login__label' htmlFor="email">Email</label>
                    <input name='email' className='login__input' required id='email' type="email" />
                    <label className='login__label' htmlFor="password">Passsword</label>
                    <input name='password' className='login__input' required id='password' type="password" />


                        { !errorCreate ?
                        <p className={!createUser ? 'login__invalid' : 'login__invalid login__invalid-opacity'}>you have created an account</p>
                        :
                        <p className={!errorCreate ? 'login__invalid' : 'login__invalid login__invalid-opacity'}> 
                        {errorCreate === "Invalid value Password must be 8 characters long" || errorCreate === "Password must be 8 characters long" ? 'Password must be min 8 characters' : errorCreate === "Email is already taken" ? 'Email is already exists' : errorCreate  } 
                        </p>
                        }
                    
                    <button className='login__btn'>Register</button>
                    </form>
                    <div className='login__footer'>
                    <p>You have an account?? <span onClick={() => navigate('/login')}>Log in</span></p>
                    </div>
                </article> 

            </div>
        </main>
    </>
  )
}

export default RegisterScreen