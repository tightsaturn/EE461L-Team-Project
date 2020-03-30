const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ability = new Schema({
                    name: String,
                    url: String, });

const pokemonSchema = new Schema({
    abilities: [{
        ability: [ability],
        is_hidden: Boolean,
        slot: Number
    }],
    base_experience: Number,
    height: Number,
    id: Number,
    moves: Array,
    name: String,
    frontSprite: String,
    backSprite: String,
    stats: {type: Array, required: true},
    types: {type: Array, required: true},
    weight: {type: Number, required: true},
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema, 'pokemon');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = Pokemon;