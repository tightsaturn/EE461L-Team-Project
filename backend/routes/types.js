const router = require('express').Router();
let Types = require('../models/types.model');           // link and require the mongoose model created for the Pokemon database

// Get a Pokemon by the id specified by PokeAPI (id field in pokemon database)
router.route(`/:name`).get((req, res) => {
    let typeName = req.params.name;
    console.log("URL /types/" + typeName + " has been called");
    Types.findOne({name: typeName})
        .then(types => res.json(types))
        .catch(err => res.status(400).json('Error:a' + err));
});

module.exports = router;