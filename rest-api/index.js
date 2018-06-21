var express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.json({message: "Data from API #1"})
})

app.get('/:id', (req, res) => {
  res.json({message: `Data from API #1 for product ${req.params.id}`})
})

console.log('Rest API #1 listening on port 8001')
app.listen(8001)