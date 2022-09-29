// code for using to according only get request and recognisizing request is get request

const http = require("http");

const query = require("querystring");

const server = http.createServer((request, response)=>{

    if(request.method == "GET"){

        let userData = query.parse(request.url.replace("/?",""));
        let username = userData.username;
        let password = userData.password;
        if(username == "dipendra" && password == 12345){
            response.writeHead(200, {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin' : '*'
            });

            const errorMessage = JSON.stringify({
                message : "User authenticated!"
            })

            response.write(errorMessage);
            response.write(request.method);
        }
        else{

            response.writeHead(401, {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin':'*'
            });

            const errorMessage = JSON.stringify({
                message : "User unauthenticated !"
            });
            
            response.write(errorMessage);
            response.write(request.method);

        }

        response.end();
    }
    else{
        
        let postData = "";
        request.on("data", (chunks)=>{
            postData += chunks.toString();
            
        });

        request.on("end", ()=>{
            let user = query.parse(postData);
            let username = user.username;
            let password = user.password;
            if(username == "dipendra" && password == 12345){
                response.writeHead(200,{
                    'Content-type' : 'application/json',
                    'Access-Control-Allow-Origin':'*'
                });

                const errorMessage = JSON.stringify({
                    message : "User authenticated!"
                })

                response.write(errorMessage);
                response.end();
            }
            else{

                response.writeHead(401, {
                    'Content-type' : 'application/json',
                    'Access-Control-Allow-Origin':'*'
                });

                const errorMessage = JSON.stringify({
                    message : "User unauthenricated !"
                })

                response.write(errorMessage);
                response.end();

            }
        })

    }


});

server.listen(8000);