var express = require("express")
//var express_graphql = require("express-graphql")
const glue = require("schemaglue")
const configSettings = require("./configSettings")
const bodyparser = require("body-parser")
const { makeExecutableSchema } = require("graphql-tools")
const mongoose = require("mongoose")
const { schema, resolver } = glue("./schema")
const ProductDB = require("./db/productDb")
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')


const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolver
})

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyparser.json(), graphqlExpress({ schema: executableSchema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});