var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const flashcards = require("../models/flashcards");
const flashcardCollections = require("../models/flashcardCollections");
const users = require("../models/users");

router.post('/api/flashcards', async function(req, res, next){
    var new_flashcard = new flashcards(req.body);
    new_flashcard.save(function (err){
        if(err) return next(err);
    });
    res.status(201).json(new_flashcard);
});

router.post('/api/users/:user_id/flashcards', async function(req, res, next){
    var user_id = req.params.user_id;
    var new_flashcard = new flashcards(req.body);
    new_flashcard.createdBy = user_id;
    
    new_flashcard.save(function (err){
        if(err) return next(err);
    });
    res.status(201).json(new_flashcard);
});

router.get('/api/flashcards', async function(req, res, next) {
    var fcs = await flashcards.find({}, function(err) {
        if(err) return next(err);

        else if(fcs.length == 0) return res.status(404).json("No flashcards found");
    });
    res.status(200).json(fcs);
});

router.get('/api/flashcards/:id', async function(req, res, next) {
    var fc = await flashcards.findById(req.params.id, function(err) {
        if(err) return next(err);

        else if(fc == null) return res.status(404).json("Flashcard not found");
    });
    res.status(200).json(fc);
});

router.put('/api/flashcards/:id', async function(req, res, next) {
    var fc = await flashcards.findByIdAndUpdate(req.params.id, {'question': req.body.question, 'answer': req.body.answer, 'hint': req.body.hint}, function(err) {
        if(err) return next(err);

        else if(fc == null) res.status(404).json("Flashcard not found");
    });
    res.status(200).json(fc);
});

router.delete('/api/flashcards/:id', async function(req, res, next) {
    var fc = await flashcards.findByIdAndDelete(req.params.id, function(err) {
        if(err) return next(err)

        else if(fc == null) return res.status(404).json("Flashcard not found")
    });
    res.status(200).json(fc);
});

router.delete('/api/flashcards', async function(req, res, next) {
    var fcs = await flashcards.deleteMany({}, function (err) {
        if(err) return next(err);

        else if(fcs.length == 0) return res.status(404).json("No flashcards to delete")

        res.status(200).json(fcs);
    });
})

router.patch('/api/flashcards/:id', async function(req, res, next) {
    var fc = await flashcards.findById(req.params.id, function(err) {
        if(err) return next(err);

        else if(fc == null) return res.status(404).json("Flashcard not found");
    });

    fc.question = req.body.question || fc.question;
    fc.answer = req.body.answer || fc.answer;
    fc.hint = req.body.hint || fc.hint;

    await fc.save(function(err) {
        if(err) return next(err);
    });

    res.status(200).json(fc);
});
module.exports = router;