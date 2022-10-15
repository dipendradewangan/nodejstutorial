const database = require("../database/db");
const createBlog =async (request, response)=>{
    const data = request.body;
    const fileInfo = request.file;
    data['image'] = fileInfo.destination+"/"+fileInfo.filename;
    try{
        const dataRes = await database.createData(data);
        response.status(200);
        response.json(dataRes);
    }
    catch(error){
        response.status(409);
        response.json(error);
    }
}

module.exports = {
    createBlog : createBlog,
}