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

// router.route(`/:id`).get((req, res) => {
//     console.log("URL /pokemon/" + req.param.id + " has been called");
// })

module.exports = router;