const jwt = require("jsonwebtoken");

exports.giveToken = (user) => {
    return jwt.sign(
        {user: user},
        process.env.JWT_SECRET,
        {expiresIn: "24h"},
    );
}

exports.validateToken = (token) => jwt.verify(token, process.env.JWT_SECRET);