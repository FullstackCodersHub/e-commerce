const sessionRouter = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { createSession, findSession, updateSession } = require('../../services/session')
const { findUser, findCreateAndUpdateUser, getGoogleUser, getGoogleOAuthTokens, validatePassword } = require('../../services/user')
const { signJwt } = require('../../utils/jwt.utils')
const { deserializeUser, requireUser } = require('../../utils/middleware')


const accessTokenCookieOptions = {
    maxAge: 300000,//15min
    httpOnly: false,
    domain: 'localhost', //for the production,set it in config
    path: '/',
    sameSite: 'strict',
    secure: false,
};

// const refreshTokenCookieOptions = {
//     ...accessTokenCookieOptions,
//     maxAge: 1800000, // 30min
// };



sessionRouter.get('/', deserializeUser, requireUser, async (req, res) => {
    const userId = res.locals.user.id


    const sessions = await findSession({ userId, valid: true })

    return res.send(sessions)
})


sessionRouter.post('/', async (req, res) => {
    //validate the user password
    const user = await validatePassword(req.body)


    if (!user) {
        return res.status(401).send('Invalid email or password')
    }
    //create a session
    const session = await createSession(user.id)

    //create an access token
    const accessToken = signJwt({ ...user, session: session.id }, '30m')
    //create an refresh token
    //const refreshToken = signJwt({ ...user, session: session.id }, '30m')//15min
    //return access and refresh tokens

    // const loggedInuserInjson = JSON.stringify(loggedInuser)
    res.cookie('accessToken', accessToken, {
        maxAge: 1800000,//30min
        httpOnly: true,
        domain: 'localhost', //for the production,set it in config
        //path: '/',
        //secure: false,  //for production set to the true
    })
    //res.cookie('user', loggedInuserInjson)

    // res.cookie('refreshToken', refreshToken, {
    //     maxAge: 1800000,//30min
    //     httpOnly: false,
    //     domain: 'localhost', //for the production,set it in config
    //     path: '/',
    //     sameSite: 'strict',
    //     secure: false,  //for production set to the true
    // })

    return res.send({ accessToken, user })

})

sessionRouter.delete('/:id', deserializeUser, async (req, res) => {
    const categoryId = Number(req.params.id)
    //const categoryId = req.params.id


    // const sessionId = res.locals.user.session
    // await updateSession(sessionId, { valid: false })

    // return res.send({
    //     accessToken: null,
    //     refreshToken: null

    // })
    try {
        const variation = await prisma.session.findUnique({
            where: {
                id: categoryId
            }
        })


        if (!variation) {
            return res.status(404).json({ error: 'User not found' })
        }

        await prisma.session.delete({
            where: {
                id: categoryId
            }
        })
        res.json({ message: 'session deleted successfully' })

    } catch (error) {
        console.log(error)
    }
})


sessionRouter.get('/oauth/google', async (req, res) => {
    try {
        //get the code from query string

        const code = req.query.code
        //get the id and access token with the code
        const { id_token, access_token } = await getGoogleOAuthTokens({ code })

        //get user with tokens
        const googleUser = await getGoogleUser({ id_token, access_token })
        //jwt.decode(id_token)

        if (!googleUser.verified_email) {
            return res.status(403).send('Google account is not verified')
        }
        //upsert the user

        const user = await findCreateAndUpdateUser(googleUser)

        // const loginUser = {
        //     email: user.email,
        //     name: user.name,
        //     id: user.id
        // }
        // const currentUser = JSON.stringify(loginUser)


        //create sessions
        const session = await createSession(user.id)



        // create an access token
        const accessToken = signJwt({ ...user, session: session.id }, '5m')


        // create a refresh token
        //const refreshToken = signJwt({ ...user, session: session.id }, '30m')//15min


        // set cookies


        res.cookie("accessToken", accessToken, accessTokenCookieOptions);

        //res.cookie("user", currentUser);
        //res.send(user)

        //res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);
        res.redirect('http://localhost:5173');


    } catch (error) {
        console.log(error, 'error')
        return res.redirect(`http://localhost:5173/oauth/error`)
    }
})

module.exports = sessionRouter


