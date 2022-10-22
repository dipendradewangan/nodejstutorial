const express = require("express");
const router = express.Router();

router.post("/", (request, response)=>{
    response.json({
        message : "company api requested"
    });
});

module.exports = router;