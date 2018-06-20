var express = require('express')
var express_graphql = require('express-graphql')
const glue = require('schemaglue')
const settings = require('./configSettings')
const { makeExecutableSchema } = require('graphql-tools')

const {schema, resolver} = glue('./schema')

const executableSchema = makeExecutableSchema({
    typeDefs: schema,
    resolvers: resolver
})
var root = {
    message: () => "I am (g)root!"
}

var app = express()
app.get('/', (req, res) =>{
    res.send('Welcome!')
})
app.use('/graphql', express_graphql({
    schema: executableSchema,
    rootValue: root,
    graphiql: settings.showGraphiQL
}))

app.listen(4000, () => console.log('GraphQL Server now running on localhost:4000/graphql'))

