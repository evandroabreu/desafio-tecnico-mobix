'use strict';
var jwt = require('jsonwebtoken');


function ensureAuthentication(request, response, next) {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({ error: 'Invalid token authentication' })
    }

    const [, token] = authToken.split(" ")

    try {
        jwt.verify(token, process.env.JWT_SECRET)
        return next()
    } catch (err) {
        return response.status(401).json({ error: 'Session expired' })
    }
}

module.exports = ensureAuthentication;
