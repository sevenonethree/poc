var express = require("express")
var express_graphql = require("express-graphql")
const glue = require("schemaglue")
const settings = require("./configSettings")
const bodyparser = require("body-parser")
const { makeExecutableSchema } = require("graphql-tools")
const mongoose = require("mongoose")

const { schema, resolver } = glue("./schema")

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver
})

mongoose.connect(settings.mongoURL)
var productSchema = mongoose.Schema({
  id: Number,
  name: String,
  shortDescription: String
})

// var productModel = mongoose.model("Product", productSchema)

var root = {
  message: () => "I am (g)root!"
}

var app = express()
app.use(bodyparser())

app.get("/", (req, res) => {
  res.send("Welcome!")
})

app.post("/api/products", (req, res) => {
  console.log(req.body)
  var obj = new productModel({
    id: req.body.id,
    name: req.body.name,
    shortDescription: req.body.shortDescription
  })

  obj.save((err, obj) => {
    err ? console.log("error:", err) : console.log("object:", obj)
  })
  res.status(200).json({ message: "They're GREEAAAAT!!!" })
})

app.get("/api/products", (req, res) => {
  productModel
    .find()
    .exec()
    .then(data => res.send(data))
  
})

app.get("/api/products/:id", (req, res) => {
    productModel
      .find({id: req.params.id})
      .exec()
      .then(data => res.send(data));
    
  });
  

app.use(
  "/graphql",
  express_graphql({
    schema: executableSchema,
    rootValue: root,
    graphiql: settings.showGraphiQL
  })
)

app.listen(4000, () =>
  console.log("GraphQL Server now running on localhost:4000/graphql")
)
