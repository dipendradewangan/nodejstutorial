console.log("this is tutorial for jwt");


const http = require("http");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secretKey = crypto.randomBytes(16).toString('hex');
// const key = crypto.randomBytes(16)


const server = http.createServer((request, response)=>{
    const successMessage = jwt.sign({
        message : 'success',
        data : [1,2,3,4,5,6]
    },
    secretKey
    );

    response.writeHead(200, {
        'Content-type' : 'application/json'
    });

    response.write(successMessage);
    response.end();
});

server.listen(200);