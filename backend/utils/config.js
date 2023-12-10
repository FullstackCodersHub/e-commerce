require('dotenv').config()

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3001,
    SECRET: process.env.SECRET,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret,
    keys: process.env.keys,
    googleClient_id: process.env.googleClient_id,
    googleClient_secret: process.env.googleClient_secret,
    googleOuthRedirectUrl: process.env.googleOuthRedirectUrl



}