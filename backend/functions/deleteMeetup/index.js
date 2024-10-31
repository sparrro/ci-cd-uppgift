const { db } = require("./../../database/index");
const { sendResponse, sendError } = require("../../responses/index");
const middy = require("@middy/core");
const { authenticate, checkOwnership } = require("../../middlewares");
const { DeleteCommand } = require("@aws-sdk/lib-dynamodb");

deleteMeetupHandler = async (event) => {
    
    const id = event.queryStringParameters["id"];

    try {

        const deleteCommand = new DeleteCommand({
            TableName: "Meetups",
            Key: {id: id}
        });
        await db.send(deleteCommand);
        return sendResponse(200, "Idk what to put here lmao")

    } catch (error) {
        console.error(error);
        return sendError(500, "Server error");
    }

}

exports.handler = middy(deleteMeetupHandler).use(authenticate).use(checkOwnership);