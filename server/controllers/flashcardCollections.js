var express = require('express');
var router = express.Router();
const FlashcardCollections = require("../models/flashcardCollections");

router.post('/api/flashcardCollections', function(req, res){
    var new_flashcardCollection = new FlashcardCollections(req.body);
    new_flashcardCollection.save(function (err){
        if(err) {return next(err);}
        res.status(201).json(new_flashcardCollection);
    });
});

router.get('/api/flashcardCollections', async function(req, res) {
    await FlashcardCollections.find(function(err, flashcardCollections) {
        if(err) {return next(err);}
        if(flashcardCollections && flashcardCollections.length === 0) {
            return res.status(404).json("No collections found");
        }
        res.status(200).json({"FlashcardCollections": flashcardCollections});
    });
});

router.get('/api/flashcardCollections/:id', async function(req, res) {
    await FlashcardCollections.findById(req.params.id, function(err, flashcardCollections) {
        if(err) { return next(err); }
        if(flashcardCollections === null) {
            return res.status(404).json({"message": "Collection not found"});
        }
        res.status(200).json(flashcardCollections);
    });
});

router.put('/api/flashcardCollections/:id', async function(req, res) {
    await FlashcardCollections.findByIdAndUpdate(req.params.id, {'subject': req.body.name}, function(err, flashcardCollections) {
        if(err) {return next(err);}
        if(flashcardCollections === null) {
            return res.status(404).json({"message": "Collection not found"});
        }
        res.status(200).json(flashcardCollections);
    });
});

router.patch('/api/flashcardCollections/:id', async function(req, res) {
    await FlashcardCollections.findById(req.params.id, function(err, flashcardCollections) {
        if(err) return next(err);

        if(flashcardCollections === null) {
            return res.status(404).json({"message": "flashcardCollections not found"});
        }
        flashcardCollections.subject = req.body.subject || flashcardCollections.subject;
        flashcardCollections.save();
        res.status(200).json(flashcardCollections);
    });
});

//Appends the chosen flashcard to the chosen collection
router.patch('/api/flashcards/:flashcard_id/flashcardCollections/:id', async function(req, res) {
    await FlashcardCollections.findById(req.params.id, function(err, flashcardCollections) {
        if(err) return next(err);

        if(flashcardCollections === null) {
            return res.status(404).json({"message": "flashcardCollection not found"});
        }

        if(!flashcardCollections.flashcards.includes(req.params.flashcard_id)) {
            flashcardCollections.flashcards.push(req.params.flashcard_id);
            flashcardCollections.save();
            return res.status(200).json(flashcardCollections);
        }
        res.status(304).json("Collection already contains flashcard");
    });
});

//Removes chosen flashcard to chosen collection
router.delete('/api/flashcards/:flashcard_id/flashcardCollections/:id', async function(req, res) {
    await FlashcardCollections.findById(req.params.id, function(err, flashcardCollections) {
        if(err) return next(err);

        if(flashcardCollections === null) {
            return res.status(404).json({"message": "flashcardCollections not found"});
        }

        let flashcards = flashcardCollections.flashcards;
        for(var i = 0; i < flashcards.length; i++) {
            if(flashcards[i] == req.params.flashcard_id) {
                flashcards.splice(i, 1);
                flashcardCollections.flashcards = flashcards;
                flashcardCollections.save();
                return res.status(200).json(flashcardCollections);
            }
        }
        return res.status(404).json({"message": "No such flashcard found in collection"});
    });
});

router.delete('/api/flashcardCollections/:id', async function(req, res) {
    await FlashcardCollections.findByIdAndDelete(req.params.id, function(err, flashcardCollections) {
        if(err) {return next(err);}
        if(flashcardCollections === null) {
            return res.status(404).json({"message": "Collection not found"});
        }
        res.status(200).json(flashcardCollections);
    });
});

router.delete('/api/flashcardCollections', async function(req, res, next) {
    await FlashcardCollections.deleteMany({}, function (err, flashcardCollections) {
        if(err) {return next(err);}
        if(flashcardCollections && flashcardCollections.length === 0) {
            return res.status(404).json("No flashcards to delete");
        }
        res.status(200).json({"Flashcards": flashcardCollections});
    });
})
module.exports = router;