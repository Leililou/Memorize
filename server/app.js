var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
const flashcard = require("./models/flashcard");
const flashcardCollection = require("./models/flashcardCollection");

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/animalDevelopmentDB';
var port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
var app = express();
// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// HTTP request logger
app.use(morgan('dev'));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// Import routes
//POST------------------------------------------------------------
var flashcards = [];
app.post('/api/flashcards', async function(req, res){
    var new_flashcard = new flashcard(req.body);
    flashcards.push(new_flashcard);
    res.json(new_flashcard);
});

var flashcardCollections = [];
app.post('/api/flashcardCollections', function(req, res){
    var new_flashcardCollection = new flashcardCollection(req.body);
    flashcardCollections.push(new_flashcardCollection);
    res.json(new_flashcardCollection);
});
//GET--------------------------------------------------------------
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to OUR DIT341 backend ExpressJS project!'});
});

app.get('/api/flashcards', function(req, res) {
    res.json({'flashcards': flashcards});
});

app.get('/api/flashcards/:id', function(req, res) {
    res.json(flashcards[req.params.id]);
});

/*app.get('/api/flashcards', function(req, res) {
    var filter = req.query.
});*/

app.get('/api/flashcardCollections', function(req, res) {
    res.json({'flashcardCollections': collections});
});

app.get('/api/flashcardCollections/:id', function(req, res) {
    res.json(flashcardCollections[req.params.id]);
});
//DELETE-----------------------------------------------------------
/*app.delete('/api/camels', function(req, res) {  //BULK DELETE
    delete camels;
    res.json(camels);
});*/

app.delete('/api/flashcards/:id', function(req, res) {
    var id = req.params.id;
    var flashcard = flashcards[id];
    delete flashcards[id];
    res.json(flashcard);
});

app.delete('/api/flashcardCollections/:id', function(req, res) {
    var id = req.params.id;
    var flashcardCollection = flashcardCollections[id];
    delete flashcardCollections[id];
    res.json(flashcardCollection);
});
//PUT--------------------------------------------------------------
app.put('/api/flashcards/:id', function(req, res) {
    var id = req.params.id;
    var updated_flashcard = {
        "_id": id,
        "question": req.body.question,
        "answer": req.body.answer
    }
    flashcards[id] = updated_flashcard;
    res.json(updated_flashcard);
});

//PATCH-------------------------------------------------------------
app.patch('/api/flashcards/:id', function(req, res) {
    var id = req.params.id;
    var flashcard = flashcards[id];
    var updated_flashcard = {
        "_id": id,
        "question": (req.body.question || flashcard.question),
        "answer": (req.body.answer || flashcard.answer)
    };
    flashcards[id] = updated_flashcard;
    res.json(updated_flashcard);
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', function (req, res) {
    res.status(404).json({ 'message': 'Not Found' });
}); 

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode
app.use(history());
// Serve static assets
var root = path.normalize(__dirname + '/..');
var client = path.join(root, 'client', 'dist');
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get('env');
// eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
    console.error(err.stack);
    var err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

app.listen(port, function(err) {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;