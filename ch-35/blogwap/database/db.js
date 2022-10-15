const mongo = require("mongoose");
const blogSchema = require("../model/blog.model");
const option = { 
    useNewUrlParser : true,
    useUnifiedTopology : true
}

mongo.connect("mongodb://127.0.0.1:27017/blogwap");

const createData = async (data)=>{
    const collection = new blogSchema(data);
    const dataRes = await collection.save();
    return dataRes;
}

module.exports = {
    createData : createData
}