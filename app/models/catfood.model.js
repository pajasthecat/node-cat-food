const mongoose = require('mongoose');

const catFoodSchema = mongoose.Schema({
    foodTitle: String,
    catName: String,
    amount: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('CatFood', catFoodSchema);