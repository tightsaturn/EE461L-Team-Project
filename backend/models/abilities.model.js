const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const abilitiesSchema = new Schema({
    effect_changes: Array,
    effect_entries: Array,
    generation: [{
        name: String,
        url: String
    }],
    id: Number,
    name: String,
    pokemon: Array
});

const Abilities = mongoose.model('Abilities', abilitiesSchema, 'abilities');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = Abilities;