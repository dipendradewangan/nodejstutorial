const database = require("./db");
const bodyParser = require("body-parser");
const urlEncoder = bodyParser.urlencoded({extended: false});
const jsonEncoder = bodyParser.json();
const express = require("express");



const server = express();
server.listen(8080);


server.use(urlEncoder);
server.use(jsonEncoder);


server.get("/users",async (request, response)=>{
    try{
        const findRes = await database.findAll("users");
        response.status(findRes.status_code);
        response.json(findRes.data);
        
    }catch(errorRes){
        console.log(errorRes);
    }
})

server.get("/users/:id",async (request, response)=>{
    const id = request.params.id;
    try{
        const findRes = await database.findById(id, "engineering_collage_india");
        response.status(findRes.status_code);
        response.json(findRes.data);
    }
    catch(errorRes){
        console.log(errorRes);
    }
})


server.post("/users",async (request, response)=>{
    const data = request.body;
    try{
        const insertRes = await database.insertById(data,"demoCollection");
        response.status(insertRes.status_code);
        response.json(insertRes.data);
    }
    catch(errorRes){
        console.log(errorRes);
    }
})

server.put("/users/:id",async (request, response)=>{
    const id = request.params.id;
    const data = request.body;
    try{
        const updateRes = await database.updateById(id, {
            $set : data
        }, "demoCollection");
        response.status(updateRes.status_code);
        response.json(updateRes.data);

    }
    catch(errorRes){
        console.log(errorRes);
    }
});

server.delete("/users/:id",async (request, response)=>{
    const id = request.params.id;
    try{
        const delRes = await database.deleteById(id, "demoCollection");
        response.status(delRes.status_code);
        response.json(delRes);
    }
    catch(errorRes){
        console.log(errorRes);
    }
})