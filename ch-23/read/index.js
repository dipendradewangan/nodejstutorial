const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response)=>{
    fs.readFile("../write/welcome.txt",(error, success)=>{
        response.write(success);
        return response.end();
    });
})

server.listen(100);