const http = require("http");
const query = require("querystring");

const server = http.createServer((request, response)=>{

    let userData = "";

    request.on("data",(chunks)=>{
        userData += chunks;
    });

    request.on("end", ()=>{
        let data = query.parse(userData);
        let username = data.username;
        let password = data.password;
        if(username == "dipendra@gmail.com" && password == 12345){
            response.writeHead(200,{
                'Content-type' : 'application/json'
            });

            const errorMessage = JSON.stringify({
                message : "User authenticated!"
            });
            response.write(errorMessage);
        }
        else{
            response.writeHead(401,{
                'Content-type': 'application/json'
            })

            const errorMessage = JSON.stringify({
                message : 'User unauthenticated!'
            });

            response.write(errorMessage);
            
        }
        response.end();
    });
    

});

server.listen(800);