const categoryRouter = require('express').Router()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

categoryRouter.get('/', async (req, res) => {
    try {
        const variation = await prisma.category.findMany()
        res.json(variation)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Internal sever Error` })
    }
})

categoryRouter.post('/', async (req, res) => {
    const { category_name } = req.body
    try {
        const newPost = await prisma.category.create({
            data: {
                category_name
            }
        })
        res.json(newPost)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Internal server error' })
    }

})

categoryRouter.delete('/:id', async (req, res) => {
    const categoryId = parseInt(req.params.id)
    try {
        const variation = await prisma.category.findUnique({
            where: {
                category_id: categoryId
            }
        })


        if (!variation) {
            return res.status(404).json({ error: 'User not found' })
        }

        await prisma.category.delete({
            where: {
                category_id: categoryId
            }
        })
        res.json({ message: 'User deleted successfully' })

    } catch (error) {
        console.log(error)
    }
})

module.exports = categoryRouter