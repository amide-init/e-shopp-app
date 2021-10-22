const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:String,
    description:String,
    price:Number,
    mrp:Number,
    image:String,
    craeted_at:Number,
    updated_at:Number,
});

module.exports = mongoose.model('Product', productSchema);