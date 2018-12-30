const CatFood = require('../models/catfood.model.js');

exports.create = (req, res) => {

    if(!req.body.foodTitle ||!req.body.amount ) {
        return res.status(400).send({
            message: "Food name and amount can not be empty"
        });
    }

    const catFood = new CatFood({
        amount : req.body.amount,
        foodTitle : req.body.foodTitle,
        catName : req.body.catName
    });

    catFood.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating this post."
        })
    });
};

exports.update = (req, res) => {

};

exports.findAll = (req, res) => {
    CatFood.find()
    .then(catFoods => {
        res.send(catFoods);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occutred while retrievieng cat foods."
        });
    });
};

exports.findOne = (req, res) => {
    var gte = new Date(req.params.date);
    var lt = new Date();
    lt.setDate(gte.getDate() + 1);

    CatFood.find({created_at: {
       $gte: gte.toISOString(),
       $lt: lt.toISOString()
   }}).then(catFoods =>{
       res.send(catFoods);
   })
   .catch(err => {
       res.status(500).send({
           message : err.message || "Some error occutred while retrievieng cat foods."
       })
   });
};