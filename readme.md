# GraphQL POC

## Running this proof of concept
Running this thing is a breeze. You can run everything with `docker-compose up`, or run the items individually.

### graphQL-api
you will need to have 2 terminal windows open. Run in this order:
1. From POC folder level run `npm run start-mongo`
1. From graphQL-api level run `npm install && nodemon`
### react-app
`npm install && npm run dev`
### rest-api
`npm install && nodemon`
### rest-api2
`npm install && nodemon`

## Adding Data to the database
Whether you choose to run via `docker-compose up` or by running the graphql-api and mongo individually, to add data you will need to use the mutation through the api.

1. Navigate to http://localhost:4000/graphiql
1. Copy the following code into the query window: 
```
mutation CreateProduct($product:ProductInput ){
  createProduct(product:$product) { 
    id,
    name
    shortDescription
  }
}
```
3. Copy the using the following template, fill out the input variable
```
{
  "product": {
    "id": 13,
    "name": "The Thirteenth Warrior",
    "shortDescription": "It's made from honey!"
  }
}
```
4. Finally, either press the play button at the top-left of the screen, or `[⌘command]`+`[return]`

If all worked, you will receive the item that you sent back from the api.
```
{
  "data": {
    "createProduct": {
      "id": 13,
      "name": "The Thirteenth Warrior",
      "shortDescription": "It's made from honey!"
    }
  }
}
```

Using that same format, add products to your heart's content! To view these items in the react application, navigate to 
if using docker-compose: 
http://localhost:3000
if running individually: 
http://localhost:8080