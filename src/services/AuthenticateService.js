'use strict';
const axios = require('axios').default;
var jwt = require('jsonwebtoken');


module.exports = class AuthenticationService {
    async execute(code) {

        try {
            const url = "https://github.com/login/oauth/access_token"

            const { data: response } = await axios.post(url, null, {
                params: {
                    client_id: process.env.OAUTH_CLIENT_ID,
                    client_secret: process.env.OAUTH_SECRET,
                    code,
                },
                headers: {
                    "Accept": "application/json"
                }
            });

            const accessTokenResponse = response.access_token;

            const token = jwt.sign(
                {
                    accessTokenResponse,
                },
                process.env.JWT_SECRET,
                {
                    subject: accessTokenResponse,
                    expiresIn: "1d"
                }
            )

            return token
        } catch (err) {
            return null;
        }
    }
}

