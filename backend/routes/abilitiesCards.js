const router = require('express').Router();
let AbilitiesCards = require('../models/abilitiesCards.model');           // link and require the mongoose model created for the Pokemon database

// Setup paths that can be called and the action that will occur
router.route('/').get((req, res) => {               // Generic url with /pokemon/
    console.log("URL /itemcards/ has been called");
    AbilitiesCards.findOne({}, function (error, documents) {
        console.log(JSON.stringify(documents))
    });
    AbilitiesCards.find()                                  // Finds all pokemon in database
        .then(abilitycards => res.json(abilitycards))         // Returns JSON with list of all pokemon
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a Pokemon by the id specified by PokeAPI (id field in pokemon database)
router.route(`/:id`).get((req, res) => {
    console.log("URL /abilitycards/" + req.params.id + " has been called");
    AbilitiesCards.findOne({id: req.params.id})
        .then(abilitycards => res.json(abilitycards))
        .catch(err => res.status(400).json('Error:a' + err));
})

module.exports = router;