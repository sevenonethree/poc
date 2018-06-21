var express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.json({message: "Data from API #2"})
})

app.get('/:id', (req, res) => {
  res.json({message: `Data from API #2 for product ${req.params.id}`})
})

console.log('Rest API #2 listening on port 8002')
app.listen(8002)