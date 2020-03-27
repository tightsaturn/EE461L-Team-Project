const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
    abilities: Array,
    base_experience: Number,
    forms: Array,
    game_indices: Array,
    height: Number,
    held_items: Array,
    id: Number,
    is_default: Boolean,
    location_area_encounters: String,
    moves: Array,
    order: Number,
    species: [{
        name: String,
        url: String
    }],
    sprites: [{
        back_default: String,
        back_female: String,
        back_shiny: String,
        back_shiny_female: String,
        front_default: String,
        front_female: String,
        front_shiny: String,
        front_shiny_female: String
    }],
    stats: {type: Array, required: true},
    types: {type: Array, required: true},
    weight: {type: Number, required: true},
});

const Pokemon = mongoose.model('Pokemon', pokemonSchema, 'pokemon');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = Pokemon;