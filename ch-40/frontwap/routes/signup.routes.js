require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;



router.post("/", (request, response)=>{
    const formData = request.body;
    const token = jwt.sign({
        iss : "",
        data : formData
    }, secretKey, {expiresIn : 120});
    console.log(token);
})

module.exports = router;