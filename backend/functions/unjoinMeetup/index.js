const { db } = require("./../../database/index");
const { sendResponse, sendError } = require("../../responses/index");
const middy = require("@middy/core");
const { authenticate } = require("../../middlewares/index");
const { UpdateCommand, QueryCommand } = require("@aws-sdk/lib-dynamodb");

const unjoinMeetupHandler = async (event) => {
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
    const meetup = result.Items[0];

    if (!meetup.attendees || !meetup.attendees.includes(userId)) {
      return sendResponse(200, "You are not signed up for this meetup");
    }

    const updatedAttendees = meetup.attendees.filter((attendee) => attendee !== userId);

    const updateCommand = new UpdateCommand({
      TableName: "Meetups",
      Key: { id: meetupId },
      UpdateExpression: "SET attendees = :updatedAttendees",
      ExpressionAttributeValues: {
        ":updatedAttendees": updatedAttendees,
      },
    });

    await db.send(updateCommand);

    return sendResponse(200, "You're out");

  } catch (error) {
    console.error(error);
    return sendError(500, "Server error");
  }
};

exports.handler = middy(unjoinMeetupHandler).use(authenticate);
