const http = require("http");
const fs = require("fs");
const signup = require("./node-api/signup");
const login = require("./node-api/login");
const verifyToken = require("./node-api/verifyToken");



const route = (path, response, statusCode, contentType)=>{
    fs.readFile(path, (error, data)=>{
        if(data){
            response.writeHead(statusCode, {
                'Content-type' : contentType
            });
            response.write(data);
            return response.end();
        }
        else{
            response.writeHead(404, {
                'Content-type' : "text/html"
            });
            response.write("file not found!");
            return response.end();
        }
       
    });
}

const server = http.createServer((request, response)=>{

    // signup.result();
    // html routing coding start
    if(request.url == "/"){
        let path = "html/homepage.html";
        
        route(path, response, 200, 'text/html');
    }
    else if(request.url == "/about"){
        let path = "html/about-us.html";
        route(path, response, 200, 'text/html');
    }
    else if(request.url == "/contect"){
        let path = "html/contect-us.html";
        route(path, response, 200, 'text/html');
    }
    
    else if(request.url == "/profile"){
        let path = "html/profile.html";
        route(path, response, 200, 'text/html');
    }
    
    // html routing coding end


    // css routing coding start
    
    else if(request.url == "/css/homepage.css"){
        let path = "css/homepage.css";
        route(path, response, 200, 'text/css');
    }
    else if(request.url == "/css/about-us.css"){
        let path = "css/about-us.css";
        route(path, response, 200, 'text/css');
    }
    else if(request.url == "/css/contect-us.css"){
        let path = "css/contect-us.css";
        route(path, response, 200, 'text/css');
    }
    else if(request.url == "/css/profile.css"){
        let path = "css/profile.css";
        route(path, response, 200, 'text/css');
    }
    else if(request.url == "/css/not-found.css"){
        let path = "css/not-found.css";
        route(path, response, 200, 'text/css');
    }
    
    // css routing coding end
    
    
    // js routing coding start
    
    else if(request.url == "/js/homepage.js"){
        let path = "js/homepage.js";
        route(path, response, 200, 'text/javascript');
    }
    else if(request.url == "/js/contect-us.js"){
        let path = "js/contect-us.js";
        route(path, response, 200, 'text/javascript');
    }
    else if(request.url == "/js/about-us.js"){
        let path = "js/about-us.js";
        route(path, response, 200, 'text/javascript');
    }

    else if(request.url == "/js/profile.js"){
        let path = "js/profile.js";
        route(path, response, 200, 'text/javascript');
    }
    else if(request.url == "/js/not-found.js"){
        let path = "js/not-found.js";
        route(path, response, 200, 'text/javascript');
    }
    
    
    // js routing coding end

    // node apis routing coding start
    else if(request.url == "/api/signup" && request.method == "POST"){
        signup.result(request, response);
    }

    else if(request.url == "/api/login" && request.method == "POST"){
        login.result(request, response);
    }

    else if(request.url == "/api/verifyToken" && request.method == "POST"){
        verifyToken.result(request, response);
    }

    // node apis routing coding end

    // else{
    //     let path = "html/not-found.html";
    //     route(path, response, 200, 'text/html');
    // }

    else{
        const reExp = {
            profile : /\/profile\?token=/,
            images : /\/assets\/images\//
        }

        if(reExp.profile.test(request.url)){
            let path = "html/profile.html";
            route(path, response, 200, 'text/html');
        }
        else if(reExp.images.test(request.url)){
            let path = request.url.slice(1);
            route(path, response, 200, 'images/jpeg');
        }
        else{
            let path = "html/not-found.html";
            route(path, response, 404, 'text/html');
        }
    }
});

server.listen(8080);