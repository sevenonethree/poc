var express = require("express")
var express_graphql = require("express-graphql")
const glue = require("schemaglue")
const configSettings = require("./configSettings")
const bodyparser = require("body-parser")
const { makeExecutableSchema } = require("graphql-tools")
const mongoose = require("mongoose")
const { schema, resolver } = glue("./schema")
const ProductDB = require("./db/productDb")

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver
})
 
const settings = configSettings[process.env.NODE_ENV || 'dev']
mongoose.connect(settings.mongoURL)

var root = {
  message: () => "I am (g)root!"
}


var app = express()
app.use(bodyparser())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("Welcome!")
})

app.post("/api/products", (req, res) => {
  console.log(req.body)
  var obj = new Products({
    id: req.body.id,
    name: req.body.name,
    shortDescription: req.body.shortDescription
  })

  obj.save((err, obj) => {
    err ? console.log("error:", err) : console.log("object:", obj)
    res.status(200).json({ "error" : err, "data" : obj})
  })
})

app.get("/api/products", (req, res) => {
  ProductDB
    .findAll()
    .then(data => res.send(data))
  
})

app.get("/api/products/:id", (req, res) => {
    ProductDB
      .findById({id: req.params.id})
      .then(data => res.send(data));
    
  });

  app.use(express.static(__dirname + './../react-app/'))

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
