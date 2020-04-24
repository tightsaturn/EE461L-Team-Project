const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const typesSchema = new Schema({
    pokemon: Array,
    name: String,
    moves: Array
});

const Types = mongoose.model('Types', typesSchema, 'types');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = Types;