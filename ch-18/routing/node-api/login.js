const database = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.result = (request, response)=>{
    // response.write("succes");
    let formdata = "";
    request.on("data",(chunks)=>{
        formdata += chunks.toString();
    })

    request.on("end",()=>{
        const user = JSON.parse(formdata);
        const query = {
            email : user.username
        };

        const findRes = database.find(query);
        findRes.then((successRes)=>{
            const userInfo = successRes;
            // console.log(userInfo);
            const realPassword = userInfo.data[0].password;
            bcrypt.compare(user.password, realPassword).then((isMatched)=>{
                if(isMatched){
                    console.log(userInfo.data[0]);
                    const token = jwt.sign(userInfo.data[0],"1234");
                    const message =JSON.stringify({
                        message : "User authenticated!",
                        token : token
                    });
                    sendResponse(response, 200, message);
                }
                else{

                    const message = JSON.stringify({
                        message : "Authentication failed !"
                    });
                    sendResponse(response, 401, message)
                }
            })
            
        }).catch((errorRes)=>{
            const message = JSON.stringify({
                message : "User not found!"
            })
            sendResponse(response, 404, message)
        })
    })

    const sendResponse = (response, statusCode, message)=>{
        response.writeHead(statusCode, {
            'Content-type' : 'application/json'
        });

        response.write(message);
        response.end();
    }


}