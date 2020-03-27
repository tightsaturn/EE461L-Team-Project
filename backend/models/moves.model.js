const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movesSchema = new Schema({
    accuracy: Number,
    contest_combos: [{
        normal:[{
            use_after: Array,
            use_before: Array,
        }],
        super: [{
            use_after: Array,
            use_before: Array,
        }]
    }],
    contest_effect: [{
        url: String
    }],
    contest_type: [{
        name: String,
        url: String
    }],
    damage_class: [{
        name: String,
        url: String
    }],
    effect_chance: Number,
    effect_changes: Array,
    effect_entries: Array,
    flavor_text_entries:Array,
    generation: [{
        name: String,
        url: String
    }],
    id: Number,
    machines: Array,
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
    names: Array,
    past_values: Array,
    power: Number,
    pp: Number,
    priority: Number,
    stat_changes: Array,
    super_contest_effect:[{
        url: String
    }],
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