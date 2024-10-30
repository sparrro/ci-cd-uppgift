const { sendError, sendResponse } = require("../responses/index");
const { validateToken } = require("../utils/jwt");

exports.authenticate = {
    before: async (handler) => {
        
        const authorization = handler.event.headers["authorization"];
        const token = authorization && authorization.split(" ")[1];
        return sendResponse(200, {token: token, authorization: authorization})
        if (!token) return sendError(401, "No valid token provided");

        const validated = validateToken(token);

        handler.event.user = validated.user

    }
}