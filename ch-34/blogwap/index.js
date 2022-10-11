const express = require("express");
const server = express();
server.listen(8080);


// enable cors
const cors = require("cors");
server.use(cors());


// recieve text
const multer = require("multer");
const multipart = multer().single("image");
const bodyParser = require("body-parser");
const urlEncoder = bodyParser.urlencoded({extended : false});
const jsonEncoder = bodyParser.json();
server.use(urlEncoder);
server.use(jsonEncoder);
server.use(multipart);



// require routing
const blogRouter = require("./routing/blog.routing");


// route middlewar
server.use("/blog", blogRouter);

































// const express = require("express");
// const server = express();
// server.listen(8080);

// // enable cors
// const cors = require("cors");
// server.use(cors());

// // recieve text 

// const bodyParser = require("body-parser");
// const multer = require("multer");
// const multipart = multer().single("image");
// const urlEncoder = bodyParser.urlencoded({extended: false});
// const jsonEncoder = bodyParser.json();
// server.use(urlEncoder);
// server.use(jsonEncoder);
// server.use(multipart);


// // require routing files
// const blogRouting = require("./routing/blog.routing");

// // middleware route
// server.use("/blog", blogRouting);