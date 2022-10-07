const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response)=>{
    fs.open("welcome.js", "w", (error, success)=>{
        if(error){
            throw error;
        }
        console.log("file created");
        response.end();
    })
})

server.listen(800);