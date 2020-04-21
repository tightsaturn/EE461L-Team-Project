const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moves2Schema = new Schema({
    pokemon: Array,
    name: String,
    pokeID: Array
});

const Moves = mongoose.model('Moves2', moves2Schema, 'moves2');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = Moves;