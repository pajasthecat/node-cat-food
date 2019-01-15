const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config/config.js');
const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'dev';
const jwtService = require('./app/infrastructure/jwt.service.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
var dbConfig;
if (env == 'dev') {
    dbConfig = require('./config/database.config.dev.js');
}
else {
    dbConfig = require('./config/database.config.js');
}

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Connected to db.");
}).catch(err => {
    console.log('Failed connecting to db. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({ "message": "Welcome to my cat food app!" })
});

require('./app/routes/user.route.js')(app);
app.use((req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    const user = jwtService.verify(token);
    if(!user){
        return res.send({ success: false, message: 'Failed to authenticate token.' });
    }
    else{
        next();
    }
});

require('./app/routes/catfood.routes.js')(app);

app.listen(config.PORT, () => {
    console.log("Server is listening to port 3000.");
});