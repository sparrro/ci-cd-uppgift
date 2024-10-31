const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { sendError, sendResponse } = require("../responses/index");
const { validateToken } = require("../utils/jwt");
const { db } = require("../database/index");

exports.authenticate = {
    before: async (handler) => {
        
        const authorization = handler.event.headers["authorization"];
        const token = authorization && authorization.split(" ")[1];
        if (!token) return sendError(401, "No valid token provided");

        const validated = validateToken(token);

        handler.event.user = validated.user

    }
}

exports.checkOwnership = {
    before: async (handler) =>{
        const meetupId = handler.event.queryStringParameters["id"];
        const queryCommand = new QueryCommand({
            TableName: "Meetups",
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": meetupId,
            },
        });
        const result = await db.send(queryCommand);
        if (result.Items.length==0) return sendError(404, "No such meetup");
        if (handler.event.user != result.Items[0].host) return sendError(403, "Can only delete own hosted meetups");
    }
}