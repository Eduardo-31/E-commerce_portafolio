import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
const ProtecteRoute = () => {

    const token = localStorage.getItem('token')
    
    if(!token){
        return <Navigate to={'/login'} />
    }else{
        return <Outlet />
    }

}

export default ProtecteRoute