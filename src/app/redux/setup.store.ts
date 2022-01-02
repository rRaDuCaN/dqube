import { configureStore } from '@reduxjs/toolkit'
import { newsSlice } from './slices'

export const store = configureStore({
    reducer: newsSlice.reducer,
    devTools: process.env.NODE_ENV !== 'production',
})
