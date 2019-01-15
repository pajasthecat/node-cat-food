module.exports = (app) =>{
    const controller = require('../controllers/user.controller.js');

    app.post('/user', controller.createUser);
    
    app.post('/auth', controller.authenticate); 
}