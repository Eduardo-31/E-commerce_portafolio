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
    //'https://e-commerce-api.academlo.tech/api/v1/products'
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/products')
        .then(res => dispatch(setProduct(res.data)))
        .catch(err => console.log(err))
        .finally(() => dispatch(setLoading(false)))
}




export default productSlice.reducer