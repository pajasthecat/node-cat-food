const CatFood = require('../models/catfood.model.js');

exports.create = (req, res) => {

    if(!req.body.catName) {
        return res.status(400).send({
            message: "Name can not be empty"
        });
    }

    const catFood = new CatFood({
        catName : req.body.catName,
        foods: req.body.foods
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
           message : err.message || "Some error occured while retrievieng cat foods."
       })
   });
};

exports.update = (req, res) =>{
    CatFood.findById(req.params.catFoodId)
    .then(catFood => {
        var doesExist = catFood.foods.find(o => o.title === req.body.foods[0].title);
        if(!doesExist){
            CatFood.findByIdAndUpdate(req.params.catFoodId, 
            {$addToSet: {foods : req.body.foods}},
            {new: true})
            .then(catFood => {
                res.send(catFood);
            });
        }
        else {
            let index = catFood.foods.findIndex(x => x.title === req.body.foods[0].title);
            catFood.foods[index].amount = catFood.foods[index].amount + req.body.foods[0].amount;
            catFood.save();
            res.send(catFood);
        }})
     .catch(err => {
       res.status(500).send({
           message : err.message || "Some error occured while updating cat foods."
       })
   });
}

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