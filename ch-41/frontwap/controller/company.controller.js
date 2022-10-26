const tokenService = require("../services/token.service");

const createCompany = (request, response)=>{
    const token = tokenService.verifyToken(request);
    if(token.isVerified){
        const data = token.data;
        console.log(data);
    }
    else{
        response.status(401);
        response.json({
            message : "Permission denied!"
        })
    }
}


module.exports = {
    createCompany : createCompany
}