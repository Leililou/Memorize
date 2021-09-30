var express = require('express');
var router = express.Router();
const Flashcards = require("../models/flashcards");
const Users = require("../models/users");

router.post('/api/flashcards', async function(req, res, next){
    var new_flashcard = new Flashcards(req.body);
    new_flashcard.save(function (err){
        if(err) {return next(err);}
        res.status(201).json(new_flashcard);
    });
});

router.post('/api/users/:user_id/flashcards', async function(req, res, next){
    var user_id = req.params.user_id;
    var new_flashcard = new Flashcards(req.body);
    await Users.findById(user_id, function(err, users) {
        if(err) { return next(err); }
        if(users === null) {
            return res.status(404).json({"message": "User not found"});
        }
    });
    new_flashcard.createdBy = user_id;
    
    new_flashcard.save(function (err){
        if(err) return next(err);
    });
    res.status(201).json(new_flashcard);
});
  
router.get('/api/users/:user_id/flashcards', async function(req, res, next){
    await Flashcards.find({createdBy: req.params.user_id}, function(err, flashcards) {
        if(err) return next(err);
        if(flashcards && flashcards.length === 0) {
            return res.status(404).json("This user does not own any flashcards");
        }
        res.status(200).json({"Flashcards": flashcards});
    });
});

router.get('/api/users/:user_id/flashcards/:id', async function(req, res, next){
    await Flashcards.findOne({createdBy: req.params.user_id, _id: req.params.id}, function(err, flashcards) {
        if(err) {return next(err);}
        if(flashcards === null) {
            return res.status(404).json("No flashcard found");
        }
        res.status(200).json({"Flashcards": flashcards});
    });
}); 

router.get('/api/flashcards', async function(req, res, next) {
    await Flashcards.find(function(err, flashcards) {
        if(err) {return next(err);}
        if(flashcards && flashcards.length === 0) {
            return res.status(404).json("No flashcards found");
        }
        res.status(200).json({"Flashcards": flashcards});
    });
});

router.get('/api/flashcards/:id', async function(req, res, next) {
    await Flashcards.findById(req.params.id, function(err, flashcards) {
        if(err) { return next(err); }
        if(flashcards === null) {
            return res.status(404).json({"message": "Flashcard not found"});
        }
        res.status(200).json(flashcards);
    });
});

router.put('/api/flashcards/:id', async function(req, res, next) {
    await Flashcards.findByIdAndUpdate(req.params.id, {'question': req.body.question, 'answer': req.body.answer, 'hint': req.body.hint}, function(err, flashcards) {
        if(err) {return next(err);}
        if(flashcards === null) {
            return res.status(404).json({"message": "Flashcard not found"});
        }
        res.status(200).json(flashcards);
    });
});

router.patch('/api/flashcards/:id', async function(req, res, next) {
    await Flashcards.findById(req.params.id, function(err, flashcards) {
        if(err) {return next(err);}
        if(flashcards === null) {
            return res.status(404).json({"message": "Flashcard not found"});
        }
        flashcards.question = req.body.question || flashcards.question;
        flashcards.answer = req.body.answer || flashcards.answer;
        flashcards.hint = req.body.hint || flashcards.hint;
        flashcards.save();
        res.status(200).json(flashcards);
    });
});

router.delete('/api/users/:user_id/flashcards/:id', async function(req, res, next){
    Flashcards.findOneAndDelete({createdBy: req.params.user_id, _id: req.params.id}, function(err, flashcards) {
        if(err) {return next(err);}
        if(flashcards === null) {
            return res.status(404).json("No flashcard found");
        }
        res.status(200).json({"Flashcards": flashcards});
    });
});

router.delete('/api/flashcards/:id', async function(req, res, next) {
    await Flashcards.findOneAndDelete({_id: req.params.id}, function(err, flashcards) {
        if(err) {return next(err);}
        if(flashcards === null) {
            return res.status(404).json({"message": "Flashcard not found"});
        }
        res.status(200).json(flashcards);
    });
});

router.delete('/api/flashcards', async function(req, res, next) {
    await Flashcards.deleteMany({}, function (err, flashcards) {
        if(err) {return next(err);}
        if(flashcards && flashcards.length === 0) {
            return res.status(404).json("No flashcards to delete");
        }
        res.status(200).json({"Flashcards": flashcards});
    });
})
module.exports = router;