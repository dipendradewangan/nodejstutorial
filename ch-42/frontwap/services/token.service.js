require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const issService = require("./iss.service");


const create = async (request, expiresIn)=>{ 
    const formData = request.body;
    const endpoint = request.get("origin");
    const api = request.originalUrl;
    const iss = endpoint+api;
    const token = await jwt.sign({
        iss : iss,
        data : formData
    }, secretKey, {expiresIn : expiresIn});

    return token;
}



const verify = (request)=>{
    const token = request.body.token;
    if(token){
        try{
            const tmpData = jwt.verify(token, secretKey);
            const requstCommingFrom = tmpData.iss;
            if(issService.indexOf(requstCommingFrom) != -1){
                return {
                    isVerified : true,
                    data : tmpData.data
                };
            }
            
        }
        catch(error){
            return {
                isVerified : false
            };
        }
    }
    else{
        return {
            isVerified : false
        };
    }
}

module.exports = {
    createToken : create,
    verifyToken : verify
}