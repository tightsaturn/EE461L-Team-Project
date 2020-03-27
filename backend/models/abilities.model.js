const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const abilitiesSchema = new Schema({
    effect_changes: Array,
    effect_entries: Array,
    flavor_text_entries: Array,
    generation: [{
        name: String,
        url: String
    }],
    id: Number,
    is_main_series: Boolean,
    name: String,
    names: Array,
    pokemon: Array
});

const Abilities = mongoose.model('Abilities', abilitiesSchema, 'ability');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = Abilities;