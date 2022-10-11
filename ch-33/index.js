const express = require("express");
const server = express();
server.listen(8080);
const database = require("./database/db");
const bodyParser = require("body-parser");
const urlEncoder = bodyParser.urlencoded({extended:false});
const jsonEncoder = bodyParser.json();

server.use(urlEncoder);
server.use(jsonEncoder);

server.get("/user",(request,response)=>{
  database.findByQuery(request,response);
})

server.get("/user/:id",(request,response)=>{
  database.fetchDataById(request,response);
})

server.put("/user/:id",(request,response)=>{
  database.findByIdAndUpdate(request,response);
})

server.delete("/user/:id",(request,response)=>{
  database.findByIdAndDelete(request,response);
});

server.post("/user",(request,response)=>{
  database.storeData(request,response);
});
