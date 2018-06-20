var express = require('express')

var app = express()

app.get('/', (req, res) => {
  res.json({message: "Data from API #2"})
})

console.log('Rest API #1 listening on port 8002')
app.listen(8002)