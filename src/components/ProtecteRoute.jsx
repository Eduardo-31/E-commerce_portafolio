import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import FooterScreen from './Shared/FooterScreen'
import HeaderScreen from './Shared/HeaderScreen'
import Loading from './Shared/Loading'

const ProtecteRoute = () => {

    const loading = useSelector(state => state.loading)
    const token = localStorage.getItem('token')
    
    if(!token){
        return <Navigate to={'/login'} />
    }else{

        return (
            <>
                {loading && <Loading/>}
                <HeaderScreen />
                <Outlet />
                <FooterScreen />
            </>
        )

    }

}

export default ProtecteRoute