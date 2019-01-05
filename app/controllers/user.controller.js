const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

exports.createUser = (req, res) => {
    const{email, password} = req.body;

    const user = new User({
        email : email,
        password: password
    });

    bcrypt.genSalt(10, (salt) => {
        bcrypt.hash(user.password, salt, (hash) => {
            user.password = hash;
            user.save();
            res.send(201);
        });
    });
};