import {createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import getHeaderConfig from '../../utils/getHeaderConfig'
import { setLoading } from './loading'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => action.payload
    }
})

export const { setCart } = cartSlice.actions

export const getAllCart = () => (dispatch) => {
    dispatch(setLoading(true))
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/cart', getHeaderConfig())
      .then(res => dispatch(setCart(res.data)))
      .catch(err => console.log(err))
      .finally(() => dispatch(setLoading(false)))
}




export default cartSlice.reducer