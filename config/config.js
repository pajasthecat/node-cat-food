module.exports = {
    ENV: process.env.NODE_ENV || 'dev',
    URL: process.env.BASE_URL || 'http://localhost:3000',
    //ADD real from msLabs
    //MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/cat-food',
    PORT: process.env.PORT|| 3000,
    JWT_SECRET: process.env.JWT_SECRET || 'secret1'
}