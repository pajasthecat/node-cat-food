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

    CatFood.find({createdAt: {
       $gte: gte,
       $lt: lt
   }}).then(catFoods =>{
       res.send(catFoods);
   })
   .catch(err => {
       res.status(500).send({
           message : err.message || "Some error occutred while retrievieng cat foods."
       })
   });
};

exports.deleteById = (req, res) => {
    CatFood.findByIdAndRemove(req.params.catFoodId)
    .then(catFood => {
        if(!catFood){
            return res.status(404).send({
                message: "Unable to find entry with id " + req.params.catFoodId
            })
        }
        res.send({message: "Entry deleted successfully."})
    }).catch(err => {
        return res.status(500).send({
            message: "Could not delete entry with id " + req.params.catFoodId
        })
    })
}