const router = require('express').Router();
let Items = require('../models/items.model');           // link and require the mongoose model created for the Pokemon database

// Setup paths that can be called and the action that will occur
router.route('/').get((req, res) => {               // Generic url with /pokemon/
    console.log("URL /items/ has been called");
    Items.findOne({}, function (error, documents) {
        console.log(JSON.stringify(documents))
    });
    Items.find()                                  // Finds all pokemon in database
        .then(items => res.json(items))         // Returns JSON with list of all pokemon
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get a Pokemon by the id specified by PokeAPI (id field in pokemon database)
router.route(`/:id`).get((req, res) => {
    console.log("URL /items/" + req.params.id + " has been called");
    Items.findOne({id: req.params.id})
        .then(items => res.json(items))
        .catch(err => res.status(400).json('Error:a' + err));
});

module.exports = router;