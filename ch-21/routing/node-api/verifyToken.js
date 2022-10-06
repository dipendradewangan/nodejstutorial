const query = require("querystring");
const jwt = require("jsonwebtoken");

exports.result = (request, response) => {
    let formdata = "";

    request.on("data", (chunks)=>{
        formdata += chunks.toString();
    });

    request.on("end", ()=>{
        const post = query.parse(formdata);
        console.log(post);
        if(post.token  && post.token != ""){
            jwt.verify(post.token,"1234", (error, success)=>{
                if(success){
                    console.log(success);
                }
                else{
                    const message = JSON.stringify({
                        isVerified : false,
                        message : "Token not verified!",
                    });
                    sendResponse(response, message, 401);
                }
            });
        }
        else{
            const message = JSON.stringify({
                isVerified : false,
                message : "Unauthorised user!",
            });
            sendResponse(response, message, 401);
        }
    })

    const sendResponse = (response,message, statusCode)=>{
        response.writeHead(statusCode, {
            'Content-type' : 'application/json'
        });

        response.write(message);
        return response.end();
    }
}