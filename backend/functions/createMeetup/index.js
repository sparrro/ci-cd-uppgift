const { db } = require("./../../database/index");
const { sendResponse, sendError } = require("../../responses/index");
const { PutCommand } = require("@aws-sdk/lib-dynamodb");
const { v4: uuidv4 } = require("uuid");

exports.handler = async (event) => {
    
    const {name, desc, time, place} = JSON.parse(event.body);
    if (!name || !desc || !time || !place) return sendError(400, "Meetup name, description, time and place required");

    try {

        const id = uuidv4();
        const host = event.user;
        const meetup = {
            id: id,
            host: host,
            attendees: [],
            name: name,
            description: desc,
            time: time,
            place: place,
        }

        const putCommand = new PutCommand({
            TableName: "Meetups",
            Item: meetup,
        });
        await db.send(putCommand);
        return sendResponse(201, meetup);

    } catch (error) {
        console.error(error);
        return sendError(500, "Server error");
    }

}