const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    title : String,
    amount: Number
});

const catFoodSchema = mongoose.Schema({
    catName: String,
    foods:[foodSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('CatFood', catFoodSchema);