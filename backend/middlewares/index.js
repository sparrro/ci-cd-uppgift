const { sendError } = require("../responses/index");
const { validateToken } = require("../utils/jwt");

exports.authenticate = {
    before: async (handler) => {
        
        const authorization = handler.event.headers["authorization"];
        const token = authorization && authorization.split(" ")[1];
        if (!token) return sendError(401, "No valid token provided");

        const validated = validateToken(token);

        handler.event.user = validated.user

    }
}