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
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/purchases', getHeaderConfig())
        .then(res => {
            const data = res.data
            if(data.length){
                const myPurchases = []
                data.map((purchase) => {
                  const index = myPurchases.findIndex((element) => element.createdAt == purchase.createdAt)
                  if(index != -1){
                    myPurchases[index].purchased.push(purchase)
                  }else{
                    const obj = {
                      id: myPurchases.length + 1,
                      createdAt: purchase.createdAt,
                      purchased: [
                        {...purchase}
                      ]
                    }
                    myPurchases.push(obj)
                  }
                });
        
                const purchasesSorted = myPurchases.sort((a,b) => (new Date(b.createdAt) - new Date(a.createdAt)));
                dispatch(setPurchases(purchasesSorted))
            }
        })
        .catch(err => console.log(err))
        .finally(() => dispatch(setLoading(false)))
}

export default purchasesSlice.reducer