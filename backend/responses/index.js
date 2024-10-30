exports.sendResponse = (status, data) => {
    return {
        statusCode: status,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"success": true, "data": data}),
    }
}

exports.sendError = (status, message) => {
    return {
        statusCode: status,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"success": false, "message": message}),
    }
}