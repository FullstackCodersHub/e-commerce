const productRouter = require('express').Router()

const { api_key, api_secret } = require('../utils/config')
const { requireUser, deserializeUser } = require('../utils/middleware')
const cloudinary = require('cloudinary').v2
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

cloudinary.config({
    cloud_name: 'dcebk8xjd',
    api_key: api_key,
    api_secret: api_secret
});

productRouter.get('/', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true,
                comments: {
                    select: {
                        comment_text: true,
                        comment_id: true,
                        user: {
                            select: {
                                name: true
                            }
                        }

                    }
                },
                cartItems: true
            }
        })
        res.json(products)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' })
    }

})

productRouter.post('/', async (req, res) => {
    const file = req.files.photo
    const categoryNum = parseInt(req.body.category_id)
    const priceNum = parseInt(req.body.price)



    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).json({ error: 'Error uploading image to Cloudinary' })
        } else {
            try {
                const newProduct = await prisma.product.create({
                    data: {
                        name: req.body.name,
                        description: req.body.description,
                        price: priceNum,
                        category_id: categoryNum,
                        image: result.url
                    }
                })
                res.json(newProduct)

            } catch (error) {
                res.status(500).json({ error: "Error creating product in database" })
            }
        }

    })

})

productRouter.post('/comment/:id', deserializeUser, async (req, res) => {

    try {

        const user = res.locals.user
        const productId = parseInt(req.params.id)


        const { comment_text } = req.body

        const product = await prisma.product.findUnique({
            where: {
                product_id: productId
            }
        })
        if (!user || !product) {
            res.status(404).json({ error: 'User or Product not found' })
        }
        const newComment = await prisma.comment.create({
            data: {
                user_id: user.id,
                product_id: productId,
                comment_text
            }
        })

        const response = {
            comment_text: newComment.comment_text,
            comment_id: newComment.comment_id,
            user: {
                name: user.name
            }
        }
        res.status(201).json(response)

    } catch (error) {
        res.status(500).json({ error: "Error in Internal server" })
    }
})

productRouter.post('/cart/:id', deserializeUser, requireUser, async (req, res) => {
    try {
        let productId = req.params.id
        if (typeof productId !== 'number') {

            productId = parseInt(req.params.id)
        }
        const userId = res.locals.user.id
        const addItemInCart = await prisma.cartItem.create({
            data: {
                user_id: userId,
                product_id: productId
            }
        })
        res.status(201).json(addItemInCart)

    } catch (error) { res.status(500).json({ error: "Error in Internal server" }) }





})

productRouter.delete('/cart/:id', deserializeUser, async (req, res) => {
    const categoryId = Number(req.params.id)

    // const sessionId = res.locals.user.session
    // await updateSession(sessionId, { valid: false })

    // return res.send({
    //     accessToken: null,
    //     refreshToken: null

    // })
    try {
        const variation = await prisma.cartItem.findUnique({
            where: {
                id: categoryId
            }
        })


        if (!variation) {
            return res.status(404).json({ error: 'cart not found' })
        }

        const deletedCart = await prisma.cartItem.delete({
            where: {
                id: categoryId
            }
        })
        res.send(deletedCart)

    } catch (error) {
        console.log(error)
    }
})

productRouter.put('/cart/:id', deserializeUser, async (req, res) => {
    const cartId = Number(req.params.id)
    const updatedQuantity = Number(req.body.quantity)

    try {
        const seekProduct = await prisma.cartItem.findUnique({
            where: {
                id: cartId
            }
        })
        const findProduct = await prisma.product.findUnique({
            where: {
                product_id: seekProduct.product_id
            }
        })
        const totalPrice = findProduct.price * updatedQuantity

        const updatedItem = await prisma.cartItem.update({
            where: { id: cartId },
            data: {
                quantity: updatedQuantity,
                price: totalPrice
            }

        })

        res.json(updatedItem)


    } catch (error) {
        res.status(500).json({ error: 'failded to updatae cart' })
    }

})

productRouter.get('/cart', async (req, res) => {
    try {
        const allCart = await prisma.cartItem.findMany()

        res.json(allCart)

    } catch (error) {
        res.status(500).json({ error: 'Internal server error' })

    }
})

module.exports = productRouter