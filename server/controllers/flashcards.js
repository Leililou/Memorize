var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const flashcards = require("../models/flashcards");
const flashcardCollections = require("../models/flashcardCollections");
const users = require("../models/users");

router.post('/api/flashcards', async function(req, res){
    var new_flashcard = new flashcards(req.body);
    new_flashcard.save(function (err){
        if(err) return console.log(err);
        console.log("Saved!");
    });
    res.json(new_flashcard);
});

router.get('/api/flashcards', async function(req, res) {
    var fcs = await flashcards.find({});
    res.json(fcs);
});

router.get('/api/flashcards/:id', async function(req, res) {
    var fc = await flashcards.findById(req.params.id);
    res.json(fc);
});

router.delete('/api/flashcards/:id', async function(req, res) {
    var fc = await flashcards.findByIdAndDelete(req.params.id);
    res.json(fc);
});

router.put('/api/flashcards/:id', async function(req, res) {
    var fc = await flashcards.findByIdAndUpdate(req.params.id, {'question': req.body.question, 'answer': req.body.answer, 'hint': req.body.hint}, function(err) {
        if(err) 
        return console.log(err);
        else
        return console.log("Updated!");
    });
    res.json(fc);
});

router.patch('/api/flashcards/:id', async function(req, res) {
    var fc = await flashcards.findById(req.params.id);

    fc.question = req.body.question || fc.question;
    fc.answer = req.body.answer || fc.answer;
    fc.hint = req.body.hint || fc.hint;

    await fc.save(function(err) {
        if(err) 
        return console.log(err);
        else
        return console.log("Updated!");
    });
    res.json(fc);
});

router.post('/api/users/:user_id/flashcards', async function(req, res, next){
    var user_id = req.params.user_id;
    var new_flashcard = new flashcards(req.body);
    new_flashcard.createdBy = user_id;
    
    new_flashcard.save(function (err){
        if(err) return next(err);
        res.json(new_flashcard);
        console.log("Saved!");
    });

    /*var user = await users.findById(user_id);
    user.ownedFlashcards.push(new_flashcard.id);
    await user.save(function(err) {
        if(err) 
        return console.log(err);
        else
        return console.log("Updated!");
    });*/
});
module.exports = router;