const { db } = require("./../../database/index");
const { sendResponse, sendError } = require("../../responses/index");
const { ScanCommand } = require("@aws-sdk/lib-dynamodb");

exports.handler = async (event) => {
    
    try {
        const scanCommand = new ScanCommand({
            TableName: "Meetups",
        });
        const result = await db.send(scanCommand);
        return sendResponse(200, result.Items);
    } catch (error) {
        console.error(error);
        return sendError(500, "Server error");
    }

}