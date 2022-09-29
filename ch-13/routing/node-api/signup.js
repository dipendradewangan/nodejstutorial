const database = require("./db");
exports.result = (request, response)=>{
    let formData = "";
    request.on("data",(chunks)=>{
        formData += chunks.toString();
    });

    request.on("end", ()=>{
        database.insertOne(formData, request, response);
    })
}