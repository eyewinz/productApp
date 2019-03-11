const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Product = new Schema({
    name: {
        type: String
    },
    priceUSD: {
        type: Number
    }
});

module.exports = mongoose.model('Product', Product);