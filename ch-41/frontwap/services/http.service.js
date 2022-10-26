const ajax = require("supertest");

const postRequest = (request)=>{
    ajax(request.endpoint).post(request.api).send({token : request.data}).end((error, dataRes)=>{
        console.log(dataRes.body);
    })
}


module.exports = {
    postRequest : postRequest
};