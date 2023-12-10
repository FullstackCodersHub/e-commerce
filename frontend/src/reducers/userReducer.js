import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'
import cartService from '../services/products'





const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        appendUser(state, action) {
            state.push(action.payload)
        },
        setUser(state, action) {
            return action.payload
        },
        appendCart(state, action) {
            if (state.id === action.payload.user_id) {
                return {
                    ...state,
                    cartItems: [...state.cartItems, action.payload]
                }
            }
            return state


        },
        deleteCart(state, action) {
            const deleteCart = {
                ...state,
                cartItems: state.cartItems.filter((cart) => cart.id !== action.payload.id)
            }

            return deleteCart
        },
        increase(state, action) {
            const updatecart = {
                ...state,
                cartItems: state.cartItems.map((cart) => cart.id === action.payload.id ? action.payload : cart)
            }
            return updatecart

        },
        decrease(state, action) {
            const decreaseCart = {
                ...state,
                cartItems: state.cartItems.map((cart) => cart.id === action.payload.id ? action.payload : cart)
            }
            return decreaseCart

        }

    }
})


export const { appendUser, setUser, appendCart, deleteCart, decrease, increase } = userSlice.actions
export default userSlice.reducer

export const creatUser = (user) => {

    return async () => {
        await userService.create(user)

    }
}

export const loginUser = (credential) => {
    return async (dispatch) => {
        const currentUser = await userService.login(credential)


        dispatch(setUser(currentUser.user))

    };
};

export const joinCart = (productId) => {
    return async dispatch => {

        const product = await cartService.addProductToCart(productId)


        dispatch(appendCart(product))

    }
}

export const increaseQuantity = (obj) => {
    return async dispatch => {

        const newQuantity = {
            ...obj,
            quantity: obj.quantity + 1
        }

        const updatedObj = await cartService.reform(obj.id, newQuantity)

        dispatch(increase(updatedObj))

    }
}

export const minusQuantity = (obj) => {
    return async dispatch => {

        const updatedQuality = obj.quantity - 1

        const newQuantity = {
            ...obj,
            quantity: updatedQuality
        }


        const updatedObj = await cartService.reform(obj.id, newQuantity)


        dispatch(decrease(updatedObj))

    }
}



export const removeCart = (id) => {
    return async (dispatch) => {
        const cartToDelete = await cartService.remove(id)

        dispatch(deleteCart(cartToDelete))

    }
}

export const currentUser = () => {
    return async (dispatch) => {
        try {
            const loginUser = await userService.getloggedInUser()

            dispatch(setUser(loginUser));

        } catch (error) {
            console.log(error.response.data.error)
        }


    }
}

export const updateUser = (update) => {
    return async (dispatch) => {
        try {
            const userToUpdate = await userService.update(update)
            console.log(userToUpdate, 'from thunk')
        } catch (error) {
            console.log(error.response.data.error)
        }
    }
}



