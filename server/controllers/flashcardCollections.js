var express = require('express');
var router = express.Router();
const flashcardCollections = require("../models/flashcardCollections");
const flashcards = require('../models/flashcards');

router.post('/api/flashcardCollections', function(req, res){
    var new_flashcardCollection = new flashcardCollections(req.body);
    new_flashcardCollection.save(function (err){
        if(err) return next(err);
    });
    res.status(201).json(new_flashcardCollection);
});

router.get('/api/flashcardCollections', async function(req, res) {
    var fccs = await flashcardCollections.find({}, function(err) {
        if(err) return next(err);

        else if(fccs.length == 0) return res.status(404).json("No collections found");
    });
    res.status(200).json(fccs);
});

router.get('/api/flashcardCollections/:id', async function(req, res) {
    var fcc = await flashcardCollections.findById(req.params.id, function(err) {
        if(err) return next(err);

        else if(fcc == null) return res.status(404).json("Collection not found");
    });
    res.status(200).json(fcc);
});

router.put('/api/flashcardCollections/:id', async function(req, res) {
    var fcc = await flashcardCollections.findByIdAndUpdate(req.params.id, {'subject': req.body.name}, function(err) {
        if(err) return next(err);

        else if(fcc == null) res.status(404).json("Collection not found");
    });
    res.status(200).json(fcc);
});

router.delete('/api/flashcardCollections/:id', async function(req, res) {
    var fcc = await flashcardCollections.findByIdAndDelete(req.params.id, function(err) {
        if(err) return next(err)

        else if(fcc == null) return res.status(404).json("Collection not found")
    });
    res.status(200).json(fcc);
});

router.delete('/api/flashcardCollections', async function(req, res, next) {
    var fccs = await flashcardCollections.deleteMany({}, function (err) {
        if(err) return next(err);

        else if(fccs.length == 0) return res.status(404).json("No collections to delete")

        res.status(200).json(fccs);
    });
})

router.patch('/api/flashcardCollections/:id', async function(req, res) {
    var fcc = await flashcardCollections.findById(req.params.id, function(err) {
        if(err) return next(err);

        else if(fcc == null) return res.status(404).json("Collection not found");
    });

    fcc.subject = req.body.subject || fcc.subject;
    
    await fcc.save(function(err) {
        if(err) return next(err);
    });

    res.status(200).json(fcc);
});

router.post('/api/flashcardCollections/:fcc_id/:flashcard_id', async function(req, res){    
    res.json(fc, fcc);
});
module.exports = router;