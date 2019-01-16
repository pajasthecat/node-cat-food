const fs = require('fs');
const jwt = require('jsonwebtoken');
var path = require('path');

var keyPath = path.join(__dirname, '..', '..', 'config');

var privateKEY = fs.readFileSync(path.join(keyPath, 'private.key'), 'utf8');
var publicKEY = fs.readFileSync(path.join(keyPath, 'public.key'), 'utf8');

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