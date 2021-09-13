var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
var cors = require('cors');
var history = require('connect-history-api-fallback');
const flashcard = require("./models/flashcard");
const flashcardCollection = require("./models/flashcardCollection");

// Variables
var mongoURI = process.env.MONGODB_URI || 'mongodb+srv://gusschauma:p455w0rd@cluster0.jnai9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
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
app.post('/api/flashcards', async function(req, res){
    var new_flashcard = await new flashcard(req.body);
    new_flashcard.save(function (err){
        if(err) return console.log(err);
        console.log("Saved!");
    });
    res.json(new_flashcard);
});

app.post('/api/flashcardCollections', function(req, res){
    var new_flashcardCollection = new flashcardCollection(req.body);
    new_flashcardCollection.save(function (err){
        if(err) return console.log(err);
        console.log("Saved!");
    });
    res.json(new_flashcardCollection);
});
//GET--------------------------------------------------------------
app.get('/api', function(req, res) {
    res.json({'message': 'Welcome to OUR DIT341 backend ExpressJS project!'});
});

app.get('/api/flashcards', async function(req, res) {
    var fcs = await flashcard.find({});
    res.json(fcs);
});

app.get('/api/flashcards/:id', async function(req, res) {
    var fc = await flashcard.findById(req.body._id);
    res.json(fc);
});

app.get('/api/flashcardCollections', async function(req, res) {
    var fccs = await flashcardCollection.find({});
    res.json(fccs);
});

app.get('/api/flashcardCollections/:id', async function(req, res) {
    var fcc = await flashcardCollection.findById(req.body._id);
    res.json(fcc);
});
//DELETE-----------------------------------------------------------
/*app.delete('/api/camels', function(req, res) {  //BULK DELETE
    delete camels;
    res.json(camels);
});*/

app.delete('/api/flashcards/:id', async function(req, res) {
    var fc = await flashcard.findByIdAndDelete(req.body._id);
    res.json(fc);
});

app.delete('/api/flashcardCollections/:id', async function(req, res) {
    var fcc = await flashcardCollection.findByIdAndDelete(req.body._id);
    res.json(fcc);
});
//PUT--------------------------------------------------------------
app.put('/api/flashcards/:id', async function(req, res) {
    var fc = await flashcard.findByIdAndUpdate(req.body._id, {'question': req.body.question, 'answer': req.body.answer}, function(err) {
        if(err) 
        return console.log(err);
        else
        return console.log("Updated!");
    });
    res.json(fc);
});

app.put('/api/flashcardCollections/:id', async function(req, res) {
    var fcc = await flashcardCollection.findByIdAndUpdate(req.body._id, {'subject': req.body.subject}, function(err) {
        if(err) 
        return console.log(err);
        else
        return console.log("Updated!");
    });
    res.json(fcc);
});

//PATCH-------------------------------------------------------------
app.patch('/api/flashcards/:id', async function(req, res) {
    var id =  await flashcardCollection.findByIdAndUpdate(req.body._id);
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