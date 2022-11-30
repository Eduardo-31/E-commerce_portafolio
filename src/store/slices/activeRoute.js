import { createSlice } from '@reduxjs/toolkit'

const activeRouteSlice = createSlice({
    name: 'activeRoute',
    initialState: '',
    reducers: {
        setActiveRoute: (state, action) => state = action.payload
    }
})

export const { setActiveRoute } = activeRouteSlice.actions

export default activeRouteSlice.reducer