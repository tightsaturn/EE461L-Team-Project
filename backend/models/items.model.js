const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    attributes: Array,
    baby_trigger_for: [{url: String}],
    category: [{
        name: String,
        url: String
    }],
    cost: Number,
    effect_entries: Array,
    flavor_text_entries: Array,
    fling_effect: [{name: String, url: String}],
    fling_power: Number,
    game_indices: Array,
    held_by_pokemon: Array,
    id: Number,
    name: String,
    names: Array,
    sprites:[{
        default: String
    }]
});

const Items = mongoose.model('Items', itemSchema, 'items');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = Items;