const mongo = require("mongodb");

exports.insertOne = (formData, request, response)=>{
    const url = "mongodb://127.0.0.1:27017";
    mongo.MongoClient.connect(url, (error, conn)=>{
        const data = JSON.parse(formData);
        const db = conn.db("routing");
        db.collection("users").insertOne(data, (error, dataRes)=>{
            if(error){
                sendResponse(response,500,"interval server error");
                
            }
            else{
                sendResponse(response, 200, dataRes);
            }
        })
    });
};

const sendResponse = (response, statusCode, responseMessage)=>{
    response.writeHead(statusCode, {
        'Content-type' : 'application/json'
    });

    let message = JSON.stringify({
        message : responseMessage
    });

    response.write(message);
    return response.end();
}