const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const auth = require('../auth.js');
const jtwService = require('../jwt.service.js');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.js');

exports.createUser = (req, res) => {
    const { email, password } = req.body;

    const user = new User({
        email: email,
        password: password
    });

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
            user.password = hash;
            try {
                const newUser = await user.save();
                res.send(201);
            } catch (err) {
                return res.send(400).send({
                    message: err.message || "Exception"
                });
            }

        });
    });
};

exports.authenticateOne = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await auth.authenticate(email, password);
        const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
            expiresIn: '15m'
        });
        const { iat, exp } = jwt.decode(token);
        res.send({ iat, exp, token });
        next();
    } catch (err) {
        return res.send(401).send({
            message: err.message
        });
    }
};

exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await auth.authenticate(email, password);
        const token = jtwService.sign(user);
        const { iat, exp } = jwt.decode(token);
        res.send({ iat, exp, token });
        next();
    } catch (err) {
        return res.send(401).send({
            message: err.message
        });
    }
};