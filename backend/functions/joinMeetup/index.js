const { db } = require("./../../database/index");
const { sendResponse, sendError } = require("../../responses/index");
const middy = require("@middy/core");
const { authenticate } = require("../../middlewares/index");
const { UpdateCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const joinMeetupHandler = async (event) => {

    const meetupId = event.queryStringParameters["id"];
    const userId = event.user;

    try {

        const queryCommand = new QueryCommand({
            TableName: "Meetups",
            KeyConditionExpression: "id = :id",
            ExpressionAttributeValues: {
                ":id": meetupId,
            },
        });
        const result = await db.send(queryCommand);
        if (result.Items[0].attendees.length>=result.Items[0].maxAttendees) return sendResponse(200, "No attendee slots available");

        const updateCommand = new UpdateCommand({
            TableName: "Meetups",
            Key: { id: meetupId},
            UpdateExpression: "SET attendees = list_append(if_not_exists(attendees, :emptyArray), :user)",
            ExpressionAttributeValues: {
                ":emptyArray": [],
                ":user": [userId],
            },
        });

        await db.send(updateCommand);

        return sendResponse(200, "You're in");

    } catch (error) {
        console.error(error);
        return sendError(500, "Server error");
    }
    
}

exports.handler = middy(joinMeetupHandler).use(authenticate);