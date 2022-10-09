const express = require("express");
const server = express();
server.listen(8080);

const router = require("./modules/routing");

server.use("/", router)
server.use("/user", router)
server.use("/employee", router)
















// const express = require("express");
// const server = express();
// server.listen(8080);

// const router = require("./modules/routing");

// server.use("/user", router);
// server.use("/employee", router);