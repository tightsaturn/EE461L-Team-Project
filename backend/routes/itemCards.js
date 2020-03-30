const router = require('express').Router();
let ItemCards = require('../models/itemsCards.model');           // link and require the mongoose model created for the Pokemon database

// Setup paths that can be called and the action that will occur
router.route('/').get((req, res) => {               // Generic url with /pokemon/
    console.log("URL /itemcards/ has been called");
    ItemCards.findOne({}, function (error, documents) {
        console.log(JSON.stringify(documents))
    });
    ItemCards.find()                                  // Finds all pokemon in database
        .then(itemcards => res.json(itemcards))         // Returns JSON with list of all pokemon
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a Pokemon by the id specified by PokeAPI (id field in pokemon database)
router.route(`/:id`).get((req, res) => {
    console.log("URL /itemcards/" + req.params.id + " has been called");
    ItemCards.findOne({id: req.params.id})
        .then(itemcards => res.json(itemcards))
        .catch(err => res.status(400).json('Error:a' + err));
})

module.exports = router;