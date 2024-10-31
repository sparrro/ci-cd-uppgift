const { db } = require("./../../database/index");
const { sendResponse, sendError } = require("../../responses/index");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const { checkPassword } = require("../../utils/bcrypt/index");
const { giveToken } = require("../../utils/jwt/index");

exports.handler = async (event) => {
    
    const { email, username, password } = JSON.parse(event.body);
    if (!password) return sendError(400, "Missing input parameters");
    if (!email || !username) return sendError(400, "Missing input parameters");

    try {

        if (email) {
            const queryCommand = new QueryCommand({
                TableName: "Users",
                IndexName: "emailIndex",
                KeyConditionExpression: "email = :email",
                ExpressionAttributeValues: {
                    ":email": email,
                },
            });
            const result = await db.send(queryCommand);
            if (result.Items.length===0) return sendError(400, "Incorrect login credentials");
            const user = result.Items[0];

            const passwordMatches = await checkPassword(password, user.password);
            if (!passwordMatches) return sendError(400, "Incorrect login credentials");

            const token = giveToken(user.id);
            return sendResponse(200, token);
        } else {
            const queryCommand = new QueryCommand({
                TableName: "Users",
                IndexName: "usernameIndex",
                KeyConditionExpression: "username = :username",
                ExpressionAttributeValues: {
                    ":username": username,
                },
            });
            const result = await db.send(queryCommand);
            if (result.Items.length===0) return sendError(400, "Incorrect login credentials");
            const user = result.Items[0];

            const passwordMatches = await checkPassword(password, user.password);
            if (!passwordMatches) return sendError(400, "Incorrect login credentials");

            const token = giveToken(user.id);
            return sendResponse(200, token)
        }

    } catch (error) {
        console.error(error);
        return sendError(500, "Server error");
    }

}