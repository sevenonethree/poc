var Products = require("./models/productModel.js")

module.exports = {
    find : function(searchObj) {
        return Products
          .find(searchObj)
          .exec()
    },
    addProduct : function(product) {
        var newProd = new Products(product)
        newProd.save();
    }
}