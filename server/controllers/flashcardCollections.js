var express = require('express');
var router = express.Router();
const flashcardCollections = require("../models/flashcardCollections");
const flashcards = require('../models/flashcards');

router.post('/api/flashcardCollections', function(req, res){
    var new_flashcardCollection = new flashcardCollections(req.body);
    new_flashcardCollection.save(function (err){
        if(err) return console.log(err);
        console.log("Saved!");
    });
    res.json(new_flashcardCollection);
});

router.get('/api/flashcardCollections', async function(req, res) {
    var fccs = await flashcardCollections.find({});
    res.json(fccs);
});

router.get('/api/flashcardCollections/:id', async function(req, res) {
    var fcc = await flashcardCollections.findById(req.params.id);
    res.json(fcc);
});

router.delete('/api/flashcardCollections/:id', async function(req, res) {
    var fcc = await flashcardCollections.findByIdAndDelete(req.params.id);
    res.json(fcc);
});

router.put('/api/flashcardCollections/:id', async function(req, res) {
    var fcc = await flashcardCollections.findByIdAndUpdate(req.params.id, {'subject': req.body.subject}, function(err) {
        if(err) 
        return console.log(err);
        else
        return console.log("Updated!");
    });
    res.json(fcc);
});

router.patch('/api/flashcardCollections/:id', async function(req, res) {
    var fc = await flashcards.findById(req.params.id);
    
    fc.subject = req.body.subject || fc.subject;
    
    await fc.save(function(err) {
        if(err) 
        return console.log(err);
        else
        return console.log("Updated!");
    });
    res.json(fc);
});

/*router.post('/api/flashcardCollections/:fcc_id/:flashcard_id', async function(req, res){
    var fcc = await flashcardCollections.findById(req.params.fcc_id);
    var fc = await flashcards.findById(req.params.flashcard_id);
    var flashcardCollections = fc.flashcardCollections;
    var flashcards = fcc.flashcards;

    if(flashcardCollections.includes(fc.id) === false) { flashcardCollections.push(fc.id); }

    if(flashcards.includes(fcc.id) === false) { flashcards.push(fcc.id); }
    
    res.json(fc, fcc);
});*/
module.exports = router;