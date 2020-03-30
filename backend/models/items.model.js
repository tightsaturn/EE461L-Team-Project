const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    attributes: Array,
    name: String,
    effect: Array,
    category: [{
        name: String,
        url: String
    }],
    sprite: String,
    cost: Number,
    id: Number
});

const Items = mongoose.model('Items', itemSchema, 'items');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = Items;