const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movesSchema = new Schema({
    accuracy: Number,
    damage_class: [{
        name: String,
        url: String
    }],
    effect_chance: Number,
    effect_entries: Array,
    generation: [{
        name: String,
        url: String
    }],
    id: Number,
    meta: [{
        aliment: [{
            name:String,
            url: String
        }],
        ailment_chance: Number,
        category:[{
            name: String,
            url: String
        }],
        crit_rate: Number,
        drain: Number,
        flinch_chance: Number,
        healing: Number,
        max_hits: Number,
        max_turns: Number,
        min_hits: Number,
        min_turns: Number,
        stat_chance: Number
    }],
    name: String,
    power: Number,
    pp: Number,
    priority: Number,
    target: [{
        name: String,
        url: String
    }],
    type:[{
        name: String,
        url: String
    }]
});

const Moves = mongoose.model('Moves', movesSchema, 'moves');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = Moves;