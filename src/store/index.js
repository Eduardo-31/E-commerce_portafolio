import { configureStore } from '@reduxjs/toolkit'
import product from './slices/product.slice'
import activeRoute from './slices/activeRoute'
import loading from './slices/loading'
import purchases from './slices/purchases.slice'
import activeCardAddProduct from './slices/activeCardAddProduct'
import cart from './slices/cart'



export default configureStore ({
    reducer: {
        product,
        activeRoute,
        loading,
        purchases,
        activeCardAddProduct,
        cart
    }
})