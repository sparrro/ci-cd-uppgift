exports.sendResponse = (status, data) => {
    return {
        statusCode: status,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({"success": true, "data": data}),
    }
}

exports.sendError = (status, message) => {
    return {
        statusCode: status,
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify({"success": false, "message": message}),
    }
}