module.exports = (app) =>{
    const controller = require('../controllers/catfood.controller.js');

    const baseRoute = '/catfood';

    app.post(baseRoute, controller.create);

    app.get(baseRoute + '/:date', controller.findOne);

    app.get(baseRoute, controller.findAll);

    app.put(baseRoute + '/:date', controller.update);

    app.delete(baseRoute + '/:catFoodId', controller.deleteById);
}