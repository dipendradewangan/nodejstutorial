const mongo = require("mongoose");
const schema = require("./schema");
const userSchema = schema.userSchema;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongo.connect("mongodb://localhost:27017/mydb",options);

const storeData = async (request,response)=>{
  const data = request.body;
  const collection = new userSchema(data);
  try{
    const storeRes = await collection.save();
    response.json(storeRes);
  }
  catch(error)
  {
    response.status(424);
    response.send(error.errors.name.properties.message)
  }

}

const fetchData = async (request,response)=>{
  const data = await userSchema.find();
  response.json(data);
}

const findOne = async (request,response)=>{
  const data = await userSchema.findOne();
  response.json(data);
}

const findByQuery = async (request,response)=>{
  const data = await userSchema.find({name:"ravi"})
  response.json(data);
}

const fetchDataById = async (request,response)=>{
  const id = request.params.id;
  const data = await userSchema.findById(id);
  response.json(data);
}

const updateDataById = async (request,response)=>{
  const id = request.params.id;
  const data = request.body;
  const updateRes = await userSchema.updateOne({"_id":id},data);
  response.json(updateRes);
}

const deleteDataById = async (request,response)=>{
  const id = request.params.id;
  const deleteRes = await userSchema.deleteOne({"_id":id});
  response.json(deleteRes);
}

const findByIdAndDelete = async (request,response)=>{
  const id = request.params.id;
  const deleteRes = await userSchema.findByIdAndDelete(id);
  response.json(deleteRes);
}

const findByIdAndUpdate = async (request,response)=>{
  const id = request.params.id;
  const data = request.body;
  const updateRes = await userSchema.findByIdAndUpdate(id,data);
  response.json(updateRes);
}


module.exports = {
  storeData : storeData,
  fetchData: fetchData,
  fetchDataById: fetchDataById,
  updateDataById: updateDataById,
  deleteDataById: deleteDataById,
  findByIdAndDelete: findByIdAndDelete,
  findByIdAndUpdate: findByIdAndUpdate,
  findOne: findOne,
  findByQuery: findByQuery
}
