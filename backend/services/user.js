const { PrismaClient } = require('@prisma/client')
const { get } = require('lodash')
const axios = require('axios')
const qs = require('qs')


const { verifyJwt } = require('../utils/jwt.utils')
const { googleClient_id, googleClient_secret, googleOuthRedirectUrl } = require('../utils/config')

const bcrypt = require('bcryptjs')
const prisma = new PrismaClient()


const validatePassword = async ({
    email,
    password,
}) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email
        },
        include: {
            cartItems: true
        }
    })

    if (!user) {
        return false;
    }

    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.password)

    //const isValid = await user.comparePassword(password);
    if (!passwordCorrect) {
        return res.status(401).json({
            error: 'invalid username or password'
        })
    }


    //if (!passwordCorrect) return false;

    return user;
}

const getGoogleOAuthTokens = async ({ code }) => {
    //define baseUrl 
    const url = 'https://oauth2.googleapis.com/token'
    const values = {
        code,
        client_id: googleClient_id,
        client_secret: googleClient_secret,
        redirect_uri: googleOuthRedirectUrl,
        grant_type: "authorization_code"
    }
    try {
        const res = await axios.post(url, qs.stringify(values), {
            headers: {
                "Content-Type": 'application/x-www-form-urlencoded',
            }
        })
        return res.data

    } catch (error) {
        console.log(error.response.data.error)
        res.send(error.message)
    }
}

const getGoogleUser = async ({ id_token, access_token }) => {
    try {
        const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`, {
            headers: {
                Authorization: `Bearer ${id_token}`
            }
        })

        return res.data
    } catch (error) {
        log.error(error, 'Error fetching Google user')
        throw new Error(error.message)
    }
}


const findCreateAndUpdateUser = async (userObj) => {

    const userExist = await prisma.user.findUnique({
        where: {
            email: userObj.email
        },
        include: {
            cartItems: true
        }
    })
    if (!userExist) {
        const newUser = await prisma.user.create({
            data: {
                name: userObj.name,
                email: userObj.email,

            },
            include: {
                cartItems: true
            }
        })
        return newUser
    } else {
        return userExist

    }
}


const findUser = async (userId) => {



    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    return user


}

module.exports = { findUser, findCreateAndUpdateUser, getGoogleUser, getGoogleOAuthTokens, validatePassword }