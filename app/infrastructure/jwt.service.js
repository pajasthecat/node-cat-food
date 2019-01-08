const fs = require('fs');
const jwt = require('jsonwebtoken');

var privateKEY = fs.readFileSync('./config/private.key', 'utf8');
var publicKEY = fs.readFileSync('./config/public.key', 'utf8');

exports.sign = (payload) => {
    var signOptions = {
        expiresIn: "15m",
        algorithm: "RS256"
    };
    return jwt.sign(payload.toJSON(), privateKEY, signOptions);
}

exports.verify = (token) => {
    var verifyOptions = {
        expiresIn: "15m",
        algorithm: ["RS256"]
    };
    try {
        return jwt.verify(token, publicKEY, verifyOptions);
    } catch (err) {
        return false;
    }
};