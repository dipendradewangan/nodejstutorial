const express = require("express");
const server = express();
server.listen(8080);

server.set("views", "./ui/html");
server.set("view engine", "pug");

const data = {
    title : "pug templete engine",
    heading : "this is my first pug page",
    description : "www.pugtemplate.com"
}


server.get("/", (request, response)=>{
    response.render("homepage", data);   
})