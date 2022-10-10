const express = require("express");
const server = express();
const bodyParser = require("body-parser");
const database = require("./database/db");
server.listen(8080);


const urlEncoder = bodyParser.urlencoded({extended : false});
const jsonEncoder = bodyParser.json();

server.use(urlEncoder);
server.use(jsonEncoder);

server.post("/user", (request, response)=>{
    database.storeData(request, response);
})

server.get("/user", (request, response)=>{
    database.fetchData(request, response);
})

server.get("/user/:id", (request, response)=>{
    database.fetchDataById(request, response);
})

server.put("/user/:id", (request, response)=>{
    database.updateDataById(request, response);
})

server.delete("/user/:id", (request, response)=>{
    database.deleteDataById(request, response);
})


















// const express = require("express");
// const server = express();
// const bodyParser = require("body-parser");
// const database = require("./database/db");
// server.listen(8080);


// const urlEncoder = bodyParser.urlencoded({extended: false});
// const jsonEncoder = bodyParser.json();

// server.use(urlEncoder);
// server.use(jsonEncoder);

// server.post("/", (request, response)=>{
//     database.storeData(request, response)
// })