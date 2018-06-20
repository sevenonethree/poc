var http = require('axios')
const settings = require('../configSettings.js')

const productMocks = [{ id: 1, name: 'Product A', shortDescription: 'First product.' }, { id: 2, name: 'Product B', shortDescription: 'Second product.' }]

exports.resolver = {
  Query: {
    products(root, {id }, context) {
      var responseData = 'Initial Info'
      const results = id ? productMocks.filter(p => p.id == id) : productMocks
      
      http.get(settings.restAPI1BaseUrl)
        .then((res) => {
          if (res.data) {
            responseData = res.data
          }
          results.map((p) => p.extraData = JSON.stringify(responseData))
        })
        .catch(err => console.log(err))
      


      if (results.length > 0) {
        return results
      }
      else {
        throw (`Product with id ${id} does not exist`)
      }
    }
  }
}