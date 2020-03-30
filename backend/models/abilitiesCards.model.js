const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const abilitiesCardSchema = new Schema({
    effect_entries: Array,
    generation: [{
        name: String,
        url: String
    }],
    id: Number,
    name: String,
});

const AbilitiesCard = mongoose.model('AbilitiesCard', abilitiesCardSchema, 'abilitiesCard');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = AbilitiesCard;