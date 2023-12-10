//const { verify } = require('jsonwebtoken')
const logger = require('./logger')
const { verifyJwt } = require('./jwt.utils')
const { get } = require('lodash')
const { reIssueAccessToken } = require('../services/session')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const deserializeUser = async (req, res, next) => {



    //get from the lodash is used for safely accessing nested object without throwin error
    const accessToken = get(req, "cookies.accessToken") || get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
    //const accessSecoken = get(req, "cookies.access123") || get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
    // const refreshToken = get(req, "cookies.refreshToken") || get(req, "headers.x-refresh");


    const { decoded, expired } = verifyJwt(accessToken)
    if (decoded === null) {
        return res.status(404).json({ error: 'this is error' })
    }
    const decodedUser = await prisma.user.findUnique({
        where: {
            email: decoded.email
        },
        include: {
            cartItems: true
        }
    })

    //console.log(decodedUser, 'dcodedUser')

    // if (expired && refreshToken) {
    //     const newAccessToken = await reIssueAccessToken({ refreshToken })


    //     if (newAccessToken) {
    //         res.setHeader('x-access-token', newAccessToken)
    //         res.cookie('accessToken', accessToken, {
    //             maxAge: 900000,//15min
    //             httpOnly: true,
    //             domain: 'localhost', //for the production,set it in config
    //             path: '/',
    //             sameSite: 'strict',
    //             secure: false,  //for production set to the true
    //         })

    //     }
    //     const result = verifyJwt(newAccessToken)

    //     res.locals.user = result.decoded
    //     return next()


    // }

    if (!decoded) {

        return res.status(401).json({ error: 'token invalid' })
    }
    if (expired) {
        return res.status(401).json({ error: 'token expired logged in again' })
    }
    res.locals.user = decodedUser
    next()
}

const requireUser = (req, res, next) => {
    const user = res.locals.user;

    if (!user) {
        return res.status(403).json({ error: 'user not found' });
    }

    next();
};


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    deserializeUser,
    requireUser
}
