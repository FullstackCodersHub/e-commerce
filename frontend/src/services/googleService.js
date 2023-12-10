const getGoogleOAuthUrl = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
    const options = {
        redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIREXT_URL,
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(" "),
    }
    console.log({ options })
    const qs = new URLSearchParams(options)
    console.log(qs.toString(), 'string')

    return `${rootUrl}?${qs.toString()}`
}

export default getGoogleOAuthUrl