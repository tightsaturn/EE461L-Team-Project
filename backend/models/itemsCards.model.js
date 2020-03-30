const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemCardSchema = new Schema({
    id: Number,
    name: String,
    frontSprite: String,
    effect: Array
});

const ItemCards = mongoose.model('ItemsCards', itemCardSchema, 'itemsCard');        // parameters: name of model, schema, name of collection that schema corresponds to

module.exports = ItemCards;