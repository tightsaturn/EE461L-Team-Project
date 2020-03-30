const router = require('express').Router();
let PokemonCards = require('../models/pokemonCards.model');           // link and require the mongoose model created for the Pokemon database

// Setup paths that can be called and the action that will occur
router.route('/').get((req, res) => {               // Generic url with /pokemon/
    console.log("URL /pokemoncards/ has been called");
    PokemonCards.findOne({}, function (error, documents) {
        console.log(JSON.stringify(documents))
    });
    PokemonCards.find()                                  // Finds all pokemon in database
        .then(pokemoncards => res.json(pokemoncards))         // Returns JSON with list of all pokemon
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a Pokemon by the id specified by PokeAPI (id field in pokemon database)
router.route(`/:id`).get((req, res) => {
    console.log("URL /pokemoncards/" + req.params.id + " has been called");
    PokemonCards.findOne({id: req.params.id})
        .then(pokemoncards => res.json(pokemoncards))
        .catch(err => res.status(400).json('Error:a' + err));
})

module.exports = router;