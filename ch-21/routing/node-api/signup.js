const database = require("./db");
const bcrypt = require("bcrypt");


exports.result = (request, response)=>{

    let formdata = "";
    request.on("data",(chunks)=>{
        formdata += chunks.toString();
    });

    request.on("end",()=>{
        const userInfo = JSON.parse(formdata);
        const query = {
            email : userInfo.email
        }
        
        const findRespnse = database.find(query, "users");
        findRespnse.then((successResponse)=>{
            // console.log(successResponse);
            sendResponse(response, successResponse.statusCode, successResponse);
        }).catch((erroResponse)=>{
            //encrypt password and then try to proceed the signup
            // createUser(userInfo);

            bcrypt.hash(userInfo.password.toString(), 10).then((encrypted_password)=>{
                userInfo['password'] = encrypted_password;
                userInfo['created_at'] = new Date();
                userInfo['updated_at'] = new Date();
                userInfo['emailVarified'] = false;
                userInfo['mobileVarified'] = false;
                createUser(userInfo);

            })
        })
    });
    
    const createUser = (userInfo)=>{
        const insertResponse = database.insertOne(userInfo, "users");
        insertResponse.then((successResponse)=>{
            sendResponse(response, successResponse.statusCode, successResponse);
            
        }).catch((erroResponse)=>{
            sendResponse(response, erroResponse.statusCode, erroResponse);
            
        });
    }

    // send request coding start
    
    const sendResponse = (response, statusCode, responseMessage)=>{
        response.writeHead(statusCode, {
            'Content-type' : 'application/json'
        });
        response.write(JSON.stringify(responseMessage));
        return response.end();
    }
    
    
    // send request coding end
};





// const database = require("./db");
// exports.result = (request, response) => {
//     let formData = "";
//     request.on("data", (chunks) => {
//         formData += chunks.toString();
//     });

//     request.on("end", () => {

//         const userInfo = JSON.parse(formData);

//         const query = {
//             'email': userInfo.email
//         }
//         const findResponse = database.find(query);

//         // check users exist or not coding start

//         findResponse.then((resolveResponse) => {
            
//             sendResponse(response, resolveResponse.statusCode, resolveResponse);

//         }).catch((rejectResponse) => {
            
//             createUser(userInfo);


//         });

//         // check users exist or not coding end
//     });

//     const createUser = (userInfo)=>{
//         const insertRes = database.insertOne(userInfo);
//         insertRes.then((successRes)=>{
//             console.log(successRes);

//         }).catch((errorRes)=>{
//             console.log(errorRes);
//         });
//     }

//     const sendResponse = (response, statusCode, responseMessage) => {
//         response.writeHead(statusCode, {
//             'Content-type': 'application/json'
//         });

//         response.write(JSON.stringify(responseMessage));
//         return response.end();
//     }

// }