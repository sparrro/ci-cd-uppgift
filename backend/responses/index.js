exports.sendResponse = (status, success, data) => {
    return {
        statusCode: status,
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"success": success, "data": data}),
    }
}