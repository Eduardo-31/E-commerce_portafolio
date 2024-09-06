import { configureStore } from '@reduxjs/toolkit'
import product from './slices/product.slice'
import activeRoute from './slices/activeRoute'
import loading from './slices/loading'
import purchases from './slices/purchases.slice'
import cart from './slices/cart'
import categories from './slices/categories.slice'



export default configureStore ({
    reducer: {
        product,
        activeRoute,
        loading,
        purchases,
        cart,
        categories
    }
})