const mongo = require("mongoose");
const companySchema = require("../model/company.model");
const url = "mongodb://127.0.0.1:27017/myCompany";
const option = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}
mongo.connect(url);

const createRecord = async (data)=>{
    const collection = new companySchema(data);
    const dataRes = await collection.save();
    return dataRes;
}


module.exports = {
    createRecord : createRecord
}