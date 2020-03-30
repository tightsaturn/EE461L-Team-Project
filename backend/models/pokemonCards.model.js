const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pokemonCardSchema = new Schema({
    id: Number,
    name: String,
    frontSprite: String,
});

const PokemonCards = mongoose.model('PokemonCards', pokemonCardSchema, 'pokemonCards');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = PokemonCards;