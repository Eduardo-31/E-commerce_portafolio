import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setLoading } from './loading'


const productSlice = createSlice({
    name: 'product',
    initialState: [],
    reducers: {
        setProduct: (state, action) => action.payload
    }
})

export const { setProduct } = productSlice.actions

export const getAll = () => (dispatch) => {
    dispatch(setLoading(true))
    URL = 'https://ecommerce-api-react.herokuapp.com/api/v1/products'
    axios.get(URL)
        .then(res => dispatch(setProduct(res.data.data.products)))
        .catch(err => console.log(err))
        .finally(() => dispatch(setLoading(false)))
}




export default productSlice.reducer