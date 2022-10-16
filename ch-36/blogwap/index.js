const express = require("express");
const server = express();
server.listen(8080);

// require middlewares
const cors = require("./middleware/cors.middleware");
const bodyParser = require("./middleware/bodyparser.middleware");
const multer = require("./middleware/multer.middleware");

// require routing
const blogRouting = require("./routing/blog.routing");



// use middlewares
server.use(bodyParser.urlEncoder);
server.use(bodyParser.jsonEncoder);
server.use(cors);
server.use(multer);
server.use("/blog", blogRouting);