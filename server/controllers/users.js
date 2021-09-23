var express = require('express');
const flashcards = require('../models/flashcards');
var router = express.Router();
const users = require("../models/users");

router.post('/api/users', async function(req, res){
    var new_user = new users(req.body);
    var password = new_user.password;
    password = scramblePass(password);
    new_user.save(function (err){
        if(err) return next(err);
        
        else if(password === new_user.password) return res.status(400).json("Invalid password");
    });
    res.status(201).json(new_user);
});

router.get('/api/users', async function(req, res) {
    var usrs = await users.find({}, function(err) {
        if(err) return next(err);

        else if(usrs.length == 0) return res.status(404).json("No users found");
    });
    res.status(200).json(usrs);
});

router.get('/api/users/:id', async function(req, res) {
    var usr = await users.findById(req.params.id, function(err) {
        if(err) return next(err);

        else if(usr == null) return res.status(404).json("User not found");
    });
    res.status(200).json(usr);
});

router.put('/api/users/:id', async function(req, res) {
    var usr = await users.findById(req.params.id, function(err) {
        if(err) return next(err);

        else if(usr == null) return res.status(404).json("User not found");
    });

    usr.email = req.body.email || usr.email;
    var password = req.body.password;
    var scrambledPass = scramblePass(password);
    if(scrambledPass != password) {
        usr.password = scrambledPass || usr.password;
    }

    await usr.save(function(err) {
        if(err) return next(err);

        else if(password === new_user.password) return res.status(400).json("Invalid password");
    });
    res.status(200).json(usr);
});

router.delete('/api/users/:id', async function(req, res) {
    var usr = await users.findByIdAndDelete(req.params.id, function(err) {
        if(err) return next(err)

        else if(usr == null) return res.status(404).json("User not found")
    });
    res.status(200).json(usr);
});

router.delete('/api/users', async function(req, res, next) {
    var usr = await users.deleteMany({}, function (err) {
        if(err) return next(err);

        else if(usr.length == 0) return res.status(404).json("No users to delete")

        res.status(200).json(usr);
    });
})

router.patch('/api/users/:id', async function(req, res) {
    var usr = await users.findById(req.params.id, function(err) {
        if(err) return next(err);

        else if(usr == null) return res.status(404).json("User not found");
    });

    usr.email = req.body.email || usr.email;
    var password = req.body.password;
    var scrambledPass = scramblePass(password);
    if(scrambledPass != password) {
        usr.password = scrambledPass || usr.password;
    }

    await usr.save(function(err) {
        if(err) return next(err);
    });
    res.status(200).json(fc);
});

router.get('/api/users/:user_id/flashcards', async function(req, res, next){//-------------------------------------------
    var user_id = req.params.user_id;
    users.findById(user_id)
    .populate("ownedFlashcards")
    .exec(function(err, user) {
        if(err) return next(err);
        res.json(user.ownedFlashcards);
    })
});

function scramblePass(password) {
    if(password != null) { 
        var decimalPass = 1;
        for(let i = 0; i < password.length; i++) {
            decimalPass =  decimalPass * password.charCodeAt(i);
        }
        decimalPass = Math.pow(decimalPass, 0.125);
        truncPass = decimalPass - Math.trunc(decimalPass);
        truncPass = truncPass * 2;
        truncPass = truncPass - Math.trunc(truncPass);
        return truncPass;
    }
    return password;
}
module.exports = router;