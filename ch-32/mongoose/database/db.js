const mongo = require("mongoose");
const schema = require("./schema");
const userSchema = schema.userSchema;
mongo.connect("mongodb://127.0.0.1:27017/mydb");


const storeData = async (request, response)=>{
    const data = request.body;
    const collection = new userSchema(data);
    const storeRes = await collection.save()
    response.json(storeRes);
}


const fetchData = async (request, response)=>{
    const data = await userSchema.find();
    response.json(data);
}

const fetchDataById = async (request, response)=>{
    const id = request.params.id;
    const data = await userSchema.find({_id : id});
    response.json(data);
}


const updateDataById = async (request, response)=>{
    const id = request.params.id;
    const data = request.body;
    const updateRes = await userSchema.updateOne({_id: id},data);
    response.json(updateRes);
}

const deleteDataById = async (request, response)=>{
    const id = request.params.id;
    const deleteRes = await userSchema.deleteOne({_id : id});
    response.json(deleteRes);
}

module.exports = {
    storeData : storeData,
    fetchData : fetchData,
    fetchDataById : fetchDataById,
    updateDataById : updateDataById,
    deleteDataById : deleteDataById
}



// const mongo = require("mongoose");
// const schema = require("./schema");
// const userSchema = schema.userSchema;
// mongo.connect("mongodb://127.0.0.1:27017/mydb");


// const storeData = async (request, response)=>{
//     const data = request.body;
//     const collection = new userSchema(data)
//     const storeRes = await collection.save();
//     response.json(storeRes);
// }


// module.exports = {
//     storeData : storeData
// }