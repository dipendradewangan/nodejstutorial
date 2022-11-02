const ajax = require("supertest");

const postRequest = async (request)=>{
    const response = ajax(request.endpoint).post(request.api).send({token : request.data});
    return response;
}


module.exports = {
    postRequest : postRequest
};