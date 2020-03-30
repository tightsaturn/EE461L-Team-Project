const router = require('express').Router();
let MoveCards = require('../models/movesCards.model');           // link and require the mongoose model created for the Pokemon database

// Setup paths that can be called and the action that will occur
router.route('/').get((req, res) => {               // Generic url with /pokemon/
    console.log("URL /itemcards/ has been called");
    MoveCards.findOne({}, function (error, documents) {
        console.log(JSON.stringify(documents))
    });
    MoveCards.find()                                  // Finds all pokemon in database
        .then(moveitems => res.json(moveitems))         // Returns JSON with list of all pokemon
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a Pokemon by the id specified by PokeAPI (id field in pokemon database)
router.route(`/:id`).get((req, res) => {
    console.log("URL /moveitems/" + req.params.id + " has been called");
    MoveCards.findOne({id: req.params.id})
        .then(moveitems => res.json(moveitems))
        .catch(err => res.status(400).json('Error:a' + err));
})

module.exports = router;