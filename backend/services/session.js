const { PrismaClient } = require('@prisma/client')
const { get } = require('lodash')
const { verifyJwt, signJwt } = require('../utils/jwt.utils')
const { findUser } = require('./user')
const prisma = new PrismaClient()



const createSession = async (userId) => {
    const session = await prisma.session.create({
        data: {
            user_id: userId
        }
    })

    return session
}

const findSession = async (query) => {
    const { userId, valid } = query


    const user = await prisma.session.findMany({
        where: {
            user_id: userId
        }
    })

    return user
}

const updateSession = async (id, update) => {
    const updatedSession = await prisma.session.update({
        where: {
            id: id
        },
        data: update
    })
    return updatedSession
}

const reIssueAccessToken = async ({ refreshToken }) => {

    const { decoded } = verifyJwt(refreshToken)

    if (!decoded || !get(decoded, 'session')) {
        return false
    }
    const session = await prisma.session.findUnique({
        where: {
            id: decoded.session
        }
    })

    if (!session || !session.valid) {
        return false
    }
    const user = await findUser(session.user_id)
    if (!user) {
        return false
    }

    const accessToken = signJwt({ ...user, session: session.id }, '5m')


    return accessToken
}


module.exports = { createSession, findSession, updateSession, reIssueAccessToken }
