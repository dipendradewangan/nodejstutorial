const query = require("querystring");
const jwt = require("jsonwebtoken");
const database = require("./db");

exports.result = (request, response) => {
    let formdata = "";

    request.on("data", (chunks) => {
        formdata += chunks.toString();
    });

    request.on("end", () => {
        const post = query.parse(formdata);

        if (post.token && post.token != "") {

            const secret_Id = post.secretId;
            const findReq = database.findById(secret_Id, "jwt_secrets");
            findReq.then((successRes) => {

                const secret = successRes.data[0].secret;

                // verify the token
                const token = jwt.verify(post.token, secret, (error, success) => {
                    if (success) {
                        if(post.verify){
                            const id = post.verify;
                            const formdata ={
                                $set : {
                                    emailVarified : true
                                }
                            }

                            // calling update email verified using id
                            database.updateById(id,formdata, "users");
                        }
                        const message = JSON.stringify({
                            isVerified: true,
                            message: "Token verified!",
                        });
                        sendResponse(response, message, 200);
                        
                    } else {
                        const message = JSON.stringify({
                            isVerified: false,
                            message: "Token not verified!",
                        });
                        sendResponse(response, message, 401);
                    }
                });
            }).catch((errorRes) => {
                console.log(errorRes);
            });

        } else {
            const message = JSON.stringify({
                isVerified: false,
                message: "Unauthorised user!",
            });
            sendResponse(response, message, 401);
        }
    })

    const sendResponse = (response, message, statusCode) => {
        response.writeHead(statusCode, {
            'Content-type': 'application/json'
        });

        response.write(message);
        return response.end();
    }
}