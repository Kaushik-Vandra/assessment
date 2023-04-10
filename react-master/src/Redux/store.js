import { configureStore } from '@reduxjs/toolkit'
import reduxApiMiddleware from './Middleware'
import thunk from 'redux-thunk'
import AuthSlice from './AuthSlice'
import UserSlice from './UserSlice'
import ShipmentSlice from './ShipmentSlice'
import ArticleSlice from './ArticleSlice'

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        user: UserSlice,
        shipment: ShipmentSlice,
        article: ArticleSlice
    },
    middleware: [thunk, reduxApiMiddleware]
}) 