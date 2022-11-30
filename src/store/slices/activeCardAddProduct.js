import { createSlice } from '@reduxjs/toolkit'

const activeCardAddProductSlice = createSlice({
    name: 'activeCardAddProduct',
    initialState: false,
    reducers: {
        setActiveCardAddProduct: (state, action) => action.payload
    }
})

export const { setActiveCardAddProduct } = activeCardAddProductSlice.actions

export default activeCardAddProductSlice.reducer