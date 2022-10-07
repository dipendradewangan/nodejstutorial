const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response)=>{
    fs.writeFile("welcome.txt","hello i am developer", (error, success)=>{
        if(error)
            throw error;
        
        console.log("written successfully");
    })
});

server.listen(8000);