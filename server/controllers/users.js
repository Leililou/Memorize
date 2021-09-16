var express = require('express');
const flashcards = require('../models/flashcards');
var router = express.Router();
const users = require("../models/users");

router.post('/api/users', async function(req, res){
    var new_flashcard = await new users(req.body);
    new_flashcard.save(function (err){
        if(err) return console.log(err);
        console.log("Saved!");
    });
    res.json(new_flashcard);
});

router.get('/api/users', async function(req, res) {
    var fcs = await users.find({});
    res.json(fcs);
});

router.get('/api/users/:id', async function(req, res) {
    var fc = await users.findById(req.params.id);
    res.json(fc);
});

router.delete('/api/users/:id', async function(req, res) {
    var fc = await users.findByIdAndDelete(req.params.id);
    res.json(fc);
});

router.put('/api/users/:id', async function(req, res) {
    var fc = await users.findByIdAndUpdate(req.params.id, {'email': req.body.email, 'password': req.body.password}, function(err) {
        if(err) 
        return console.log(err);
        else
        return console.log("Updated!");
    });
    res.json(fc);
});

router.patch('/api/users/:id', async function(req, res) {
    var fc = await users.findById(req.params.id);

    fc.email = req.body.email || fc.email;
    fc.password = req.body.password || fc.password;

    await fc.save(function(err) {
        if(err) 
        return console.log(err);
        else
        return console.log("Updated!");
    });
    res.json(fc);
});

router.get('/api/users/:user_id/flashcards', async function(req, res, next){
    var user_id = req.params.user_id;
    users.findById(user_id)
    .populate("ownedFlashcards")
    .exec(function(err, user) {
        if(err) return next(err);
        res.json(user.ownedFlashcards);
    })
});
module.exports = router;