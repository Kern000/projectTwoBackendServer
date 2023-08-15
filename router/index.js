const express = require("express");
const cors = require("cors");
const {router:entryRoute} = require("./router-routes.js");
const {login, register} = require("../controller-layer/user-controller.js");

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());
server.use("/entry", entryRoute);

server.get("/user/login", login);
server.post("/user/register", register);

server.listen(port, ()=> console.log(`Server is listening to port: ${port}`));
