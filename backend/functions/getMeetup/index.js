const { db } = require("./../../database/index");
const { sendResponse, sendError } = require("../../responses/index");
const { QueryCommand } = require("@aws-sdk/lib-dynamodb");

exports.handler = async (event) => {

    const id = event.queryStringParameters["id"];
    
    try {

        const queryCommand = new QueryCommand({
            TableName: "Meetups",
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": id,
            },
        });
        const result = await db.send(queryCommand);
        if (result.Items.length==0) return sendError(404, "Not found");
        return sendResponse(200, result.Items[0]);

    } catch (error) {
        console.error(error);
        return sendError(500, "Server error");
    }

}