var express = require('express');
const Flashcards = require('../models/flashcards');
var router = express.Router();
const Users = require("../models/users");

router.post('/api/users', async function(req, res, next){
    var new_user = new Users(req.body);
    var password = new_user.password;
    new_user.password = scramblePass(password);
    new_user.save(function (err){
        if(err) {return next(err);}
        if(password === new_user.password) {return res.status(400).json("Invalid password")};
        res.status(201).json(new_user);
    });
});

router.get('/api/users', async function(req, res, next) {
    await Users.find({}, function(err, users) {
        if(err) {return next(err);}
        if(users && users.length === 0) {
            return res.status(404).json("No users found");
        }
        res.status(200).json({"Users": users});
    });
});

router.get('/api/users/:id', async function(req, res, next) {
    await Users.findById(req.params.id, function(err, users) {
        if(err) { return next(err); }
        if(users === null) {
            return res.status(404).json({"message": "User not found"});
        }
        res.status(200).json(users);
    });
});

router.put('/api/users/:id', async function(req, res, next) {
    await Users.findById(req.params.id, function(err, users) {
        if(err) return next(err);
        if(users === null) {
            return res.status(404).json({"message": "User not found"});
        }

        users.email = req.body.email;
        var password = req.body.password;
        var scrambledPass = scramblePass(password);
        if(scrambledPass != password) {
            users.password = scrambledPass;
        }

        users.save(function(err) {
            if(err) {return next(err);}
    
            res.status(200).json(users);
        });
    });
});

router.patch('/api/users/:id', async function(req, res, next) {
    await Users.findById(req.params.id, function(err, users) {
        if(err) return next(err);

        if(users === null) {return res.status(404).json("User not found");}

        users.email = req.body.email || users.email;
        var password = req.body.password;
        var scrambledPass = scramblePass(password);
        if(scrambledPass !== password) {
            users.password = scrambledPass || users.password;
        }

        users.save(function(err) {
            if(err) return next(err);
        
            res.status(200).json(users);
        });
    });   
});

router.delete('/api/users/:id', async function(req, res, next) {
    await Users.findOneAndDelete({_id: req.params.id}, function(err, users) {
        if(err) {return next(err);}
        if(users === null) {return res.status(404).json("User not found");}
        res.status(200).json(users);
    });
});

router.delete('/api/users', async function(req, res, next) {
    await Users.deleteMany({}, function (err, users) {
        if(err) {return next(err);}
        if(users && users.length === 0) {
            return res.status(404).json("No users to delete");
        }
        res.status(200).json({"Users": users});
    });
})

function scramblePass(password) {
    if(password !== null) { 
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