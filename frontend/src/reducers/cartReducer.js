import { createSlice } from '@reduxjs/toolkit'
import cartService from '../services/products'






// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: [],
//     reducers: {
//         appendCart(state, action) {
//             state.push(action.payload)
//         },
//         setCart(state, action) {
//             return action.payload
//         }

//     }
// })

// export const { appendCart, setCart } = cartSlice.actions
// export default cartSlice.reducer

// export const addCart = (productId) => {
//     return async dispatch => {

//         const product = await cartService.addProductToCart(productId)

//         dispatch(appendCart(product))


//         // dispatch(setProduct(product))
//     }
// }

// export const getCart = () => {
//     return async dispatch => {
//         const allCart = await cartService.getCart()
//         dispatch(setCart(allCart))
//     }
// }


