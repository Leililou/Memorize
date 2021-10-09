var express = require('express');
var router = express.Router();
const FlashcardCollections = require("../models/flashcardCollections");
const Flashcards = require("../models/flashcards");
const Users = require("../models/users");

router.post('/api/flashcardCollections', function(req, res, next){
    var new_flashcardCollection = new FlashcardCollections(req.body);
    new_flashcardCollection.save(function (err){
        if(err) {return next(err);}
        res.status(201).json(new_flashcardCollection);
    });
});

router.post('/api/users/:user_id/flashcardCollections', async function(req, res, next){
    var user_id = req.params.user_id;
    var new_flashcardCollection = new FlashcardCollections(req.body);
    await Users.findById(user_id, function(err, users) {
        if(err) { return next(err); }
        if(users === null) {
            return res.status(404).json({"message": "User not found"});
        }
    });
    new_flashcardCollection.createdBy = user_id;
    
    new_flashcardCollection.save(function (err){
        if(err) return next(err);
    });
    res.status(201).json(new_flashcardCollection);
});

router.post('/api/flashcardCollections/:id/flashcards', async function(req, res, next) {
    await FlashcardCollections.findById(req.params.id, function(err, flashcardCollections) {
        if(err) return next(err);

        if(flashcardCollections === null) {
            return res.status(404).json({"message": "flashcardCollection not found"});
        }
        var new_flashcard = new Flashcards(req.body);
        new_flashcard.save(function (err){
            if(err) {return next(err);}
        });
        flashcardCollections.flashcards.push(new_flashcard._id);
        flashcardCollections.save();
        res.status(201).json(new_flashcard);
    });
});
  
router.get('/api/users/:user_id/flashcardCollections', async function(req, res, next){
    await FlashcardCollections.find({createdBy: req.params.user_id}, function(err, flashcardCollections) {
        if(err) return next(err);
        if(flashcardCollections && flashcardCollections.length === 0) {
            return res.status(404).json("This user does not own any collections");
        }
        res.status(200).json({"FlashcardCollections": flashcardCollections});
    });
});

router.get('/api/flashcardCollections/:flashcardCollection_id/flashcards', async function(req, res, next){
    await FlashcardCollections.find({_id: req.params.flashcardCollection_id}).populate('flashcards').exec(function(err, flashcards) {
        if(err) return next(err);
        if(flashcards && flashcards.length === 0) {
            console.log(flashcards);
            return res.status(404).json("This collection does not have any flashcards");
        }
        res.status(200).json({"Flashcards": flashcards});
    });
});

router.get('/api/users/:user_id/flashcardCollections/:id', async function(req, res, next){
    await FlashcardCollections.findOne({createdBy: req.params.user_id, _id: req.params.id}, function(err, flashcardCollections) {
        if(err) {return next(err);}
        if(flashcardCollections === null) {
            return res.status(404).json("No collection found");
        }
        res.status(200).json({"FlashcardCollections": flashcardCollections});
    });
}); 

router.get('/api/flashcardCollections', async function(req, res, next) {
    await FlashcardCollections.find(function(err, flashcardCollections) {
        if(err) {return next(err);}
        if(flashcardCollections && flashcardCollections.length === 0) {
            return res.status(404).json("No collections found");
        }
        res.status(200).json({"FlashcardCollections": flashcardCollections});
    });
});

router.get('/api/flashcardCollections/:id', async function(req, res, next) {
    await FlashcardCollections.findById(req.params.id, function(err, flashcardCollections) {
        if(err) { return next(err); }
        if(flashcardCollections === null) {
            return res.status(404).json({"message": "Collection not found"});
        }
        res.status(200).json(flashcardCollections);
    });
});

router.put('/api/flashcardCollections/:id', async function(req, res, next) {
    await FlashcardCollections.findById(req.params.id, function(err, flashcardCollections) {
        if(err) return next(err);

        if(flashcardCollections === null) {
            return res.status(404).json({"message": "flashcardCollections not found"});
        }
        flashcardCollections.name = req.body.name;
        flashcardCollections.desc = req.body.desc;
        flashcardCollections.save();
        res.status(200).json(flashcardCollections);
    });
});

router.patch('/api/flashcardCollections/:id', async function(req, res, next) {
    await FlashcardCollections.findById(req.params.id, function(err, flashcardCollections) {
        if(err) return next(err);

        if(flashcardCollections === null) {
            return res.status(404).json({"message": "flashcardCollections not found"});
        }
        flashcardCollections.name = req.body.name || flashcardCollections.name;
        flashcardCollections.desc = req.body.desc || flashcardCollections.desc;
        flashcardCollections.save();
        res.status(200).json(flashcardCollections);
    });
});

//Appends the chosen flashcard to the chosen collection
router.patch('/api/flashcards/:flashcard_id/flashcardCollections/:id', async function(req, res, next) {
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

//Removes chosen flashcard from chosen collection
router.delete('/api/flashcards/:flashcard_id/flashcardCollections/:id', async function(req, res, next) {
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

router.delete('/api/users/:user_id/flashcardCollections/:id', async function(req, res, next){
    FlashcardCollections.findOneAndDelete({createdBy: req.params.user_id, _id: req.params.id}, function(err, flashcardCollections) {
        if(err) {return next(err);}
        if(flashcardCollections === null) {
            return res.status(404).json("No collection found");
        }
        res.status(200).json({"FlashcardCollections": flashcardCollections});
    });
});

router.delete('/api/flashcardCollections/:id', async function(req, res, next) {
    await FlashcardCollections.findOneAndDelete({_id: req.params.id}, function(err, flashcardCollections) {
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