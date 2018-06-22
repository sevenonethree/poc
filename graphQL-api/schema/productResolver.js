var http = require("axios")
const configSettings = require("../configSettings.js")
const mongoose = require("mongoose")
var productModel = require('../db/models/productModel')
var ProductDB = require("../db/productDb")

var settings = configSettings[process.env.NODE_ENV || 'dev']

mongoose.connect(settings.mongoURL);

exports.resolver = {
  Query: {
    products(root, { id }, context) {
      var products
      if (id) {
        products = ProductDB.findById(id)
      } else {
        products = ProductDB.findAll()
      }
      return products;
    },
  },
  Mutation: {
    createProduct(root, { product }) {
      console.log(root, product)
      ProductDB.addProduct(product)
      return product
    }
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
