var http = require("axios");
const settings = require("../configSettings.js");
const mongoose = require("mongoose");

const productMocks = [
  { id: 1, name: "Product A", shortDescription: "First product." },
  { id: 2, name: "Product B", shortDescription: "Second product." }
];

// mongoose.connect('mongodb://mongo:27017')
mongoose.connect("mongodb://localhost:27017");
var productSchema = mongoose.Schema({
  id: Number,
  name: String,
  shortDescription: String
});

var productModel = mongoose.model("Product", productSchema);

exports.resolver = {
  Query: {
    products(root, { id }, context) {
      var products;
      if (id) {
        products = productModel.find({ id: id }).exec();
      } else {
        products = productModel.find().exec();
      }
      return products;
    },
  },
  Product: {
    extraData (root) { 
      return http.get(`${settings.restAPI1BaseUrl}/${root.id}`).then(res => res.data)
    },
    extraData2 (root) {
      return http.get(settings.restAPI2BaseUrl).then(res => res.data)
    }
  }
};
