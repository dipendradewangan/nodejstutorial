const express = require("express");
const server = express();
server.listen(8080);

const root = __dirname;
const path = require("path");
const ui = path.join(root, "ui");
server.use(express.static("ui"))


server.set("views", "./ui/html");
server.set("view engine", "pug");


server.get("/", (request, response)=>{
    const user = {
        isLogged : false
    }
    response.render("homepage", user);
})

server.get("/career", (request, response)=>{
    response.render("career");
})

server.get("/about-us", (request, response)=>{
    response.render("about-us");
})

server.get("/download", (request, response)=>{
    response.render("download");
})

server.get("/contect-us", (request, response)=>{
    response.render("contect-us");
})