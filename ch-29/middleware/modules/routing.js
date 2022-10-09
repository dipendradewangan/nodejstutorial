const express = require("express");
const router = express.Router();
const employee = require("./employee");
const user = require("./user");

const controller = (middlewareRoute)=>{
    switch(middlewareRoute){
        case "/user" : return user();
        break;
        case "/employee" : return employee();
        break;
        default : return "not found!";

    }
}

router.get("/", async (request, response)=>{
    const result = await controller(request.originalUrl);
    response.send(result);
});


router.post("/", async (request, response)=>{
    const result = await controller(request.originalUrl);
    response.send(result);
});

router.put("/", async (request, response)=>{
    const result = await controller(request.originalUrl);
    response.send(result);
});

router.delete("/", async (request, response)=>{
    const result = await controller(request.originalUrl);
    response.send(result);
});



module.exports = router;













// const express = require("express");
// const router = express.Router();
// const employee = require("./employee");
// const user = require("./user");

// const controller = (middlewareRoute)=>{
//     switch(middlewareRoute){
//         case "/user" : return user();
//         break;
//         case "/employee" : return employee();
//         break;
//         default : return "not found!";
//     }
// }

// router.get("/", async (request, response)=>{
//     const result = await controller(request.originalUrl);
//     response.send(result);
// })

// router.post("/", async (request, response)=>{
//     const result = await controller(request.originalUrl);
//     response.send(result);
// })

// router.put("/", async (request, response)=>{
//     const result = await controller(request.originalUrl);
//     response.send(result);
// })

// router.delete("/", async (request, response)=>{
//     const result =  awaitcontroller(request.originalUrl);
//     response.send(result);
// })

// module.exports = router;