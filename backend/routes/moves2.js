const router = require('express').Router();
let Moves2 = require('../models/moves2.model');           // link and require the mongoose model created for the Pokemon database

// Get a Pokemon by the id specified by PokeAPI (id field in pokemon database)
router.route(`/:name`).get((req, res) => {
    let moveName = req.params.name;
    moveName = moveName[0].toUpperCase() + moveName.substring(1);
    let foundDash = false;

    if(moveName == "10-000-000-volt-thunderbolt")
    {
        moveName = "10,000,000-Volt-Thunderbolt"
    }else if(moveName == "Light-that-burns-the-sky"){
        moveName = "Light-That-Burns-the-Sky"
    }else if(moveName == "Roar-of-time"){
        moveName = "Roar-of-Time"
    }else{
        if(moveName.includes("--")){
            let index = moveName.lastIndexOf("-");
            moveName = moveName.substring(0, index - 1);
        }

        for(let i = 0; i< moveName.length; i++){
            if(foundDash){
                foundDash = false;
                moveName = moveName.substring(0,i) + moveName[i].toUpperCase() + moveName.substring(i+1);
            }

            if(moveName[i] == "-"){
                foundDash = true;
            }

        }
    }

    console.log("URL /moves2/" + moveName + " has been called");
    Moves2.findOne({name: moveName})
        .then(moves => res.json(moves))
        .catch(err => res.status(400).json('Error:a' + err));
});

module.exports = router;