const tokenService = require("../services/token.service");
const dbService = require("../services/database.service");

const create =async (request, response)=>{
    const token = await tokenService.verifyToken(request);;
    if(token.isVerified){
        const data = token.data
        try{
            const dataRes = await dbService.createRecord(data, 'user');
            console.log(dataRes);
            response.status(200);
            response.json({
                isUserCreated : true,
                message : "created user !",
                data : dataRes
            })
        }
        catch(error){
            response.status(500);
            response.json({
                isUserCreated : false,
                message : "internal server error !"
            });
        }

    }
    else{
        response.status(401);
        response.json({
            message : "Permission denied !"
        })
    }
}



module.exports = {
    createUser : create
}
