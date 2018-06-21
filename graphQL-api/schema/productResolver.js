var http = require("axios");
const settings = require("../configSettings.js");
const mongoose = require("mongoose");
var Products = require("../models/productModel");

mongoose.connect(settings.mongoURL);

exports.resolver = {
  Query: {
    products(root, { id }, context) {
      var products;
      if (id) {
        products = Products.find({ id: id }).exec();
      } else {
        products = Products.find().exec();
      }
      return products;
    },
  },
  Product: {
    extraData (root) { 
      return http.get(`${settings.restAPI1BaseUrl}/${root.id}`).then(res => res.data)
    },
    extraData2 (root) {
      return http.get(`${settings.restAPI2BaseUrl}/${root.id}`).then(res => res.data)
    }
  }
};
