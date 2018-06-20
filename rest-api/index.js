var express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.json({message: "Data from API #1"})
})

console.log('Rest API #1 listening on port 8001')
app.listen(8001)