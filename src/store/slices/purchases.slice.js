import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import getHeaderConfig from '../../utils/getHeaderConfig'
import { setLoading } from './loading'

const purchasesSlice = createSlice({
    name: 'purchase',
    initialState: [],
    reducers: {
        setPurchases: (state, action) => action.payload
    }
})

export const { setPurchases } = purchasesSlice.actions

export const getAllPurchases = () => (dispatch) => {
    dispatch(setLoading(true))
    //axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getHeaderConfig())
    axios.get('https://e-commerce-api.academlo.tech/api/v1/purchases', getHeaderConfig())
          .then(res => {
              const purchasesSorted = res.data.data.purchases.sort(function(a,b){return new Date(b.createdAt) - new Date(a.createdAt);});
                //setPurchases(purchasesSorted)
                //dispatch(setPurchases(res.data.data.purchases))
                dispatch(setPurchases(purchasesSorted))
          })
          .catch(err => console.log(err))
          .finally(() => dispatch(setLoading(false)))
}

export default purchasesSlice.reducer