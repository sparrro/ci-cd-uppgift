const { db } = require("./../../database/index");
const { sendResponse, sendError } = require("../../responses/index");
const { validate } = require("email-validator");
const { QueryCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require("../../utils/bcrypt");

exports.handler = async (event) => {

    const { username, email, password } = JSON.parse(event.body);
    if (!username || !email || !password) return sendError(400, "Missing signup parameters");
    if (!validate(email)) return sendResponse(400, "Invalid email format");

    try {

        const usernameQueryComm = new QueryCommand({
            TableName: "Users",
            IndexName: "usernameIndex",
            KeyConditionExpression: "username = :username",
            ExpressionAttributeValues: {
                ":username": username,
            },
        });
        const usernameResult = await db.send(usernameQueryComm);

        const emailQueryComm = new QueryCommand({
            TableName: "Users",
            IndexName: "emailIndex",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
                ":email": email,
            },
        });
        const emailResult = await db.send(usernameQueryComm);

        if (usernameResult.Items.length>0 || emailResult.Items.length>0) return sendError(409, "Email or username already in use");

        const hashedPassword = await hashPassword(password);
        const id = uuidv4();
        const user = {
            id: id,
            username: username,
            email: email,
            password: hashedPassword,
        }

        const putCommand = new PutCommand({
            TableName: "Users",
            Item: user,
        });
        await db.send(putCommand);

        return sendResponse(201, user);

    } catch (error) {
        console.error(error);
        return sendError(500, "server error");
    }

}