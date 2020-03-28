const router = require('express').Router();
let Pokemon = require('../models/pokemon.model');           // link and require the mongoose model created for the Pokemon database

// -------------------------------------------------------------
// Setup paths that can be called and the action that will occur
// -------------------------------------------------------------

// Get all Pokemon in the database
router.route('/').get((req, res) => {               // Generic url with /pokemon/
    console.log("URL /pokemon/ has been called");
    Pokemon.find()                                  // Finds all pokemon in database
        .then(pokemon => res.json(pokemon))         // Returns JSON with list of all pokemon
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a Pokemon by the id specified by PokeAPI (id field in pokemon database)
router.route(`/:id`).get((req, res) => {
    console.log("URL /pokemon/" + req.params.id + " has been called");
    Pokemon.findOne({id: req.params.id})
        .then(pokemon => res.json(pokemon))
        .catch(err => res.status(400).json('Error:a' + err));
});

module.exports = router;