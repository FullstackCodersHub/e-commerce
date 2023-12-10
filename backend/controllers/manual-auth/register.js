const bcrypt = require('bcryptjs')
const registerRouter = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const { deserializeUser } = require('../../utils/middleware')
const prisma = new PrismaClient()


registerRouter.get('/hellow', (req, res) => {
    res.send('<h1>Hello World</h1>')
})

registerRouter.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Internal sever Error` })
    }
})


registerRouter.post('/', async (req, res) => {
    const { name, password, email } = req.body
    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const newUser = await prisma.user.create({
            data: {

                email,
                name,
                password: passwordHash,



            }
        })
        res.json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Internal server Error` })
    }
})

registerRouter.delete('/:id', async (req, res) => {
    const userId = parseInt(req.params.id)
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        await prisma.user.delete({
            where: {
                id: userId
            }
        })
        res.json({ message: 'User deleted successfully' })

    } catch (error) {
        console.log(error)
    }
})

registerRouter.put('/', deserializeUser, async (req, res) => {

    try {
        console.log(req.body, 'from api')
        const { name, address, contact } = req.body
        const userId = res.locals.user.id
        console.log(userId, 'userId from token')

        let user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        if (name) {
            user = await prisma.user.update({
                where: { id: userId },
                data: { name: name },
            })
        }
        if (address) {
            user = await prisma.user.update({
                where: { id: userId },
                data: { address: address },
            })
        }
        if (contact) {
            user = await prisma.user.update({
                where: { id: userId },
                data: { contact: contact },
            })
        }

        res.status(200).json({ message: 'User information updated successfully', user: user })

    } catch (error) {
        res.status(400).json({ error: 'Internal server error' })
    }


})


module.exports = registerRouter