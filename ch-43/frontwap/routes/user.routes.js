const express = require("express");
const userContoller = require("../controller/user.contoller");
const router = express.Router();

router.post("/", (request, response)=>{
    userContoller.createUser(request, response);
});


module.exports = router;