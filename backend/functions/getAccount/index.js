const { db } = require("./../../database/index");
const { sendResponse, sendError } = require("../../responses/index");
const { authenticate } = require("../../middlewares");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");
const middy = require("@middy/core");

export const handler = async (event) => {

    const id = event.queryStringParameters["id"];

    try {

        const queryCommand = new QueryCommand({
            TableName: "Users",
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": id,
            },
        });
        const result = await db.send(queryCommand);

        return sendResponse(200, result.Items[0]);

    } catch (error) {
        console.error(error);
        return sendError(500, "Server error");
    }

}