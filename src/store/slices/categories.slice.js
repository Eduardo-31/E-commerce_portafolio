import { createSlice } from "@reduxjs/toolkit";
import { setLoading } from "./loading";
import axios from "axios";
import getHeaderConfig from "../../utils/getHeaderConfig";

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: [],
    reducers: {
        setCategories: (state, action) => action.payload
    }
})

export const { setCategories } = categoriesSlice.actions;


export const getAllCategories = () => (dispatch) => {
    dispatch(setLoading(true))
    axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories', getHeaderConfig())
        .then(res => dispatch(setCategories(res.data)))
        .catch(err => console.log(err))
        .finally(() => dispatch(setLoading(false)))
}

export default categoriesSlice.reducer
