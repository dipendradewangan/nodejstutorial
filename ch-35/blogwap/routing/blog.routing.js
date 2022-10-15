const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");

router.get("/", (request, response)=>{
    response.send("get response");
});

router.post("/", (request, response)=>{
    blogController.createBlog(request, response);
});

router.put("/", (request, response)=>{
    response.send("put response");
});

router.delete("/", (request, response)=>{
    response.send("delete response");
});

module.exports = router;