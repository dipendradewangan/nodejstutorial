const database = require("./db");

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
        
        const findRespnse = database.find(query);
        findRespnse.then((successResponse)=>{
            // console.log(successResponse);
            sendResponse(response, successResponse.statusCode, successResponse.message);
        }).catch((erroResponse)=>{
            // new user try to proceed the signup
            console.log(erroResponse);
            createUser(userInfo);
        })
    });

    const createUser = (userInfo)=>{
        const insertResponse = database.insertOne(userInfo);
        insertResponse.then((successResponse)=>{
            console.log(insertResponse);
        }).catch((erroResponse)=>{
            console.log(erroResponse);
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