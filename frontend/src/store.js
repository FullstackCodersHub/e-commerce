import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers/productReducer'
import userReducer from './reducers/userReducer'
//import cartReducer from './reducers/cartReducer'

const store = configureStore({
    reducer: {
        products: reducer,
        user: userReducer,
        //cart: cartReducer
    }

})
console.log(store.getState())

export default store