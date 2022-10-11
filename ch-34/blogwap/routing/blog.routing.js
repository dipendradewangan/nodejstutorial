const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller");

router.get("/",(request,response)=>{
    response.send("get request");
})

router.post("/",(request,response)=>{
    blogController.uploadFile(request, response);
})

router.put("/",(request,response)=>{
    response.send("put request");
})

router.delete("/",(request,response)=>{
    response.send("delete request");
})


module.exports = router;












// const express = require("express");
// const router = express.Router();

// router.get("/", (request, response)=>{
//     response.send("get request");
// });

// router.post("/", (request, response)=>{
//     console.log(request.file);
//     response.json(request.body);
// });

// router.put("/", (request, response)=>{
//     response.send("put request");
// });

// router.delete("/", (request, response)=>{
//     response.send("delete request");
// });

// module.exports = router;

