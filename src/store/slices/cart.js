import {createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import getHeaderConfig from '../../utils/getHeaderConfig'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: null,
    reducers: {
        setCart: (state, action) => action.payload
    }
})

export const { setCart } = cartSlice.actions

export const getAllCart = () => (dispatch) => {
    axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getHeaderConfig())
      .then(res => dispatch(setCart(res.data.data.cart.products)),
      )
      .catch(err => console.log(err))
}




export default cartSlice.reducer