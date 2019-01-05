module.exports = (app) =>{
    const controller = require('../controllers/user.controller.js');

    const baseRoute = '/user';

    app.post(baseRoute, controller.createUser);

    //app.get(baseRoute, controller.getToken);
}