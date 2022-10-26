require("dotenv").config();
const express = require("express");
const router = express.Router();
const tokenService = require("../services/token.service");
const httpService = require("../services/http.service");





router.post("/", async (request, response)=>{
    const token = await tokenService.createToken(request, 120);
    httpService.postRequest({
        endpoint : request.get("origin"),
        api : "/api/private/company",
        data : token
    });
    
})

module.exports = router;