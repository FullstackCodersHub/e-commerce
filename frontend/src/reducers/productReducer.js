import { createSlice } from '@reduxjs/toolkit'
import productService from '../services/products'



const productSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        appendProduct(state, action) {
            state.push(action.payload)
        },
        setProduct(state, action) {
            return action.payload
        },
        comment(state, action) {

            return state.map(product => {
                if (product.product_id === action.payload.id) {
                    const updatedComments = [...product.comments]
                    updatedComments.unshift(action.payload.userComment)
                    return {
                        ...product,
                        comments: updatedComments
                    }
                }
                return product
            })



        }

    }
})

export const { appendProduct, setProduct, comment } = productSlice.actions
export default productSlice.reducer

export const getProduct = () => {
    return async dispatch => {
        const product = await productService.getAll()

        dispatch(setProduct(product))
    }
}

export const newComment = (id, object) => {
    return async dispatch => {

        const userComment = await productService.addComment(id, object)

        dispatch(comment({ userComment, id }))
    }
}


