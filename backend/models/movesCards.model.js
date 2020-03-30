const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movesCardSchema = new Schema({
    effect_entries: Array,
    generation: [{
        name: String,
        url: String
    }],
    id: Number,
    name: String,
    type:[{
        name: String,
        url: String
    }]
});

const MovesCard = mongoose.model('MovesCard', movesCardSchema, 'movesCard');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = MovesCard;