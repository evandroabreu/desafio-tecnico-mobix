
//import { AuthenticationService } from "../services/AuthenticateService";
var AuthenticationService = require('../services/AuthenticateService');

module.exports = class AuthenticationController {
    async handle(request, response, next) {

        const code = request.query.code

        const service = new AuthenticationService();

        try {
            const result = await service.execute(code)

            if (!result) {
                return response.status(401).json({ error: "The token passed is incorrect or expired" });
            }

            return response.json(result);
        } catch (err) {
            return response.status(401).json(err);
        }
    }
}

