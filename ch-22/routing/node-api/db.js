const mongo = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const ObjectId = require("mongodb").ObjectId;
const config = ()=>{
    return new Promise((resolve, reject)=>{
        mongo.MongoClient.connect(url, (error, conn)=>{
            const db = conn.db("users");
            resolve(db);
        })

    })
}


// fetch and find the data

exports.find = (query, collection_name)=>{
    return new Promise((resolve, reject)=>{
        config().then((db)=>{
            db.collection(collection_name).find(query).toArray((error, dataResponse)=>{
                if(dataResponse.length != 0){
                    resolve({
                        statusCode : 200,
                        data : dataResponse,
                        message : "Match found !"
                    });
                }
                else{
                    reject({
                        statusCode : 404,
                        message : "Data not found !"
                    })
                }
            })
        })
    })
}





// fetch and find the data using object id

exports.findById = (id, collection_name)=>{
    return new Promise((resolve, reject)=>{
        config().then((db)=>{
            db.collection(collection_name).find({
                _id : ObjectId(id)
            }).toArray((error, dataResponse)=>{
                if(dataResponse.length != 0){
                    resolve({
                        statusCode : 200,
                        data : dataResponse,
                        message : "Match found !"
                    });
                }
                else{
                    reject({
                        statusCode : 404,
                        message : "Data not found !"
                    })
                }
            })
        })
    })
}
// isnertone function defination

exports.insertOne = (userInfo, collection_name)=>{

    return new Promise((resolve, reject)=>{

        config().then((db)=>{
            db.collection(collection_name).insertOne(userInfo,(error, dataResponse)=>{
                if(error){
                    reject({
                    statusCode : 500,
                        message : "internal server error"
                    })
                }
                else{
                    resolve({
                        statusCode : 200,
                        data : dataResponse,
                        message : "Data inserted !"
                    })
                }
            })
        });
    });
}























































// const mongo = require("mongodb");
// const url = "mongodb://127.0.0.1:27017";

// const config = ()=>{
//     return new Promise((resolve, reject)=>{
//         mongo.MongoClient.connect(url,(error, conn)=>{
//             const db = conn.db("users");
//             const collection = db.collection("users");
//             resolve(collection);
//         })
//     });



// }

// exports.find = (query)=>{

//     return new Promise((resolve, reject)=>{

//         config().then((collection)=>{
//             collection.find(query).toArray((error, dataResponse)=>{
//                 console.log(dataResponse);
//                 if(dataResponse.length != 0){
//                     resolve({
//                         statusCode : 200,
//                         data : dataResponse,
//                         message : "Match found!"
//                     })
//                 }
//                 else{
//                     reject({
//                         statusCode : 404,
//                         message : 'Data not found!'
//                     })
//                 }
//             })
//         });
//     })


// }





// exports.insertOne = (formData)=>{
//     return new Promise((resolve, reject)=>{
//         config().then((collection)=>{
//             collection.insertOne(formData, (error, dataResponse)=>{
//                 if(error){
//                     reject({
//                         statusCode : 500,
//                         message : "Internal server error"
//                     });
//                 }
//                 else{
//                     resolve({
//                         statusCode : 200,
//                         data : dataResponse,
//                         message : "Data inserted!"
//                     });
//                 }
//             });
//         });
//     });
// }




// exports.insertOne = (formData, response)=>{
//     mongo.MongoClient.connect(url, (error,conn)=>{

//         const data = JSON.parse(formData);
//         const db = conn.db("users");
//         db.collection("users").insertOne(data, (error, dataResponse)=>{
//             if(error){
//                 sendResponse(response, 500, 'internal sever error !');
//             }
//             else{
//                 sendResponse(response, 200,dataResponse );

//             }
//         })
//     });
// };


// const sendResponse = (response, statusCode, responseMessage)=>{
//     response.writeHead(statusCode,{
//         'Content-type' : 'application/json'
//     });

//     const message = JSON.stringify({
//         message : responseMessage
//     })

//     response.write(message);
//     return response.end();

// }
