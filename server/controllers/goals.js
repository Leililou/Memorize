var express = require('express');
var router = express.Router();
const Goals = require("../models/goals");

router.post('/api/goals', async function(req, res, next){
    var new_goal = new Goals(req.body);
    new_goal.save(function (err){
        if(err) {return next(err);}
        res.status(201).json(new_goal);
    });
});

router.get('/api/goals', async function(req, res, next) {
    await Goals.find(function(err, goals) {
        if(err) {return next(err);}
        if(goals && goals.length === 0) {
            return res.status(404).json("No goals found");
        }
        res.status(200).json({"Goals": goals});
    });
});

router.get('/api/goals/:id', async function(req, res, next) {
    await Goals.findById(req.params.id, function(err, goals) {
        if(err) { return next(err); }
        if(goals === null) {
            return res.status(404).json({"message": "Goal not found"});
        }
        res.status(200).json(goals);
    });
});

router.put('/api/goals/:id', async function(req, res, next) {
    await Goals.findById(req.params.id, function(err, goals) {
        if(err) {return next(err);}
        if(goals === null) {
            return res.status(404).json({"message": "Goal not found"});
        }
        goals.name = req.body.name;
        goals.description = req.body.description;
        goals.importanceRating = req.body.importanceRating;
        goals.status = req.body.status;
        goals.save();
        res.status(200).json(goals);
    });
});

router.patch('/api/goals/:id', async function(req, res, next) {
    await Goals.findById(req.params.id, function(err, goals) {
        if(err) {return next(err);}
        if(goals === null) {
            return res.status(404).json({"message": "Goal not found"});
        }
        goals.name = req.body.name || goals.name;
        goals.description = req.body.description || goals.description;
        goals.importanceRating = req.body.importanceRating || goals.importanceRating;
        goals.status = req.body.status || goals.status;
        goals.save();
        res.status(200).json(goals);
    });
});

router.delete('/api/goals/:id', async function(req, res, next) {
    await Goals.findOneAndDelete({_id: req.params.id}, function(err, goals) {
        if(err) {return next(err);}
        if(goals === null) {
            return res.status(404).json({"message": "Goal not found"});
        }
        res.status(200).json(goals);
    });
});

router.delete('/api/goals', async function(req, res, next) {
    await Goals.deleteMany({}, function (err, goals) {
        if(err) {return next(err);}
        if(goals && goals.length === 0) {
            return res.status(404).json("No Goals to delete");
        }
        res.status(200).json({"Goals": goals});
    });
})

module.exports = router;