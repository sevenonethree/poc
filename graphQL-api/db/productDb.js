var Products = require("./models/productModel.js")

module.exports = {
    findById : function(id) {
        return Products
          .find({id: id})
          .exec()
    },
    findAll : function() {
        return Products.find({}).exec()
    }
}