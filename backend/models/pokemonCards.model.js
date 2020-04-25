const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonCardSchema = new Schema({
    id: Number,
    name: String,
    frontSprite: String,
    types: Array
});

const PokemonCards = mongoose.model('PokemonCards', pokemonCardSchema, 'pokemonCard');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = PokemonCards;