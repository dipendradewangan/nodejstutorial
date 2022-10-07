const http = require("http");
const fs = require("fs");
const server = http.createServer((request, response)=>{
    fs.rename("welcome.txt","renamed.txt", (error)=>{
        if(error)
            throw error;
        
        console.log("renamed successfully");
        return response.end();
    })
});

server.listen(8000);