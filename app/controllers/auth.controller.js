const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = mongoose.model('user');

exports.authenticate = (email, password) => {
    return new Promise((resolve, reject) => {
        try {
            const user = User.findOne({ email: email });
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (error) throw err;
                if (isMatch) {
                    resolve(user);
                } else {
                    reject('Authentication failed.');
                }
            })
        } catch (err) {
            reject('Authentication failed.');
        }
    });
}
