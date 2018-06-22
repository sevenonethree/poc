module.exports=  {
  'dev':{
  showGraphiQL: true,
  restAPI1BaseUrl: "http://localhost:8001",
  restAPI2BaseUrl: "http://localhost:8002",
  mongoURL: "mongodb://localhost:27017"
},
'production': {
  showGraphiQL: false,
  restAPI1BaseUrl: "http://rest-api-1:8001",
  restAPI2BaseUrl: "http://rest-api-2:8002",
  mongoURL: "mongodb://mongo:27017"
}
}