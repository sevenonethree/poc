var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = mongoose.Schema({
    id: Number,
    name: String,
    shortDescription: String
  });
module.exports = mongoose.model('Products', productSchema);