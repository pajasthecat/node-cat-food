const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const auth = require('../auth.js');

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

exports.authenticate = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await auth.authenticate(email, password);
        console.log(user);
        return next();
    } catch (err) {
        return res.send(401).send({
            message: err.message
        });
    }
};