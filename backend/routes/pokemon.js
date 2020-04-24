const router = require('express').Router();
let Pokemon = require('../models/pokemon.model');           // link and require the mongoose model created for the Pokemon database
const mongoose = require('mongoose');

async function getPokemonInRange(props) {
    var result = [];
    
    console.log("Getting Pokemon:");
    console.log("----------------");
    for (let i = props.start_id; i <= props.end_id; i++) {
        await Pokemon.findOne({id: i})
            .then(pokemon => {
                result.push(pokemon)
                console.log(result)
            })
    }

    console.log(result);
    return result;
}

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

// Get total number of Pokemon in database.
// NOTE: This function does NOT work. DO NOT USE FOR NOW. The problem is tha
//       it returns the following error:
//       "Error:aCastError: Cast to number failed for value \"totalNumPokemon\" at path \"id\" for model \"Pokemon\""
router.route('/totalNumPokemon').get((req, res) => {
    console.log("URL /totalNumPokemon has been called");
    // Pokemon.countDocuments({}, function (err, count) {
    //     console.log('Count: ' + count);
    //     res = count;
    // });
    Pokemon.estimatedDocumentCount()
        .then(count => {
            console.log("count: " + count)
            res.json(count)
        })
    // console.log("count: " + Pokemon.estimatedDocumentCount());
    // res.json(Pokemon.estimatedDocumentCount());
});

// Get a list of Pokemon within the inclusive range provided. Range is in terms of the id specified
// by PokeAPI (id field in pokemon database)
router.route('/:start_id/:end_id').get(async (req, res) => {
    console.log("URL /pokemon/" + req.params.start_id + "/" + req.params.end_id + " has been called");
    var result_array = [];
    
    var id_array = [];
    for (let i = req.params.start_id; i <= req.params.end_id; i++) {
        id_array.push(i);
    }

    Pokemon.find().where('id').in(id_array)
        .then(pokemon => res.json(pokemon))
        .catch(err => res.status(400).json('Error:a' + err));
});

// Get the moves associated with a given pokemon
router.route(`/:id/moves_list`).get((req, res) => {
    console.log("URL /pokemon/" + req.params.id + "/moves_list has been called");
    Abilities.findOne({id: req.params.id}, 'moves')
        .then(abilities => res.json(abilities))
        .catch(err => res.status(400).json('Error:a' + err));
})

module.exports = router;