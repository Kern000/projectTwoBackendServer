const express = require("express");
const cors = require("cors");
const {router: userRoute} = require("./router-routes.js")

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());
server.use("/user", userRoute);

server.listen(port, ()=> console.log(`Server is listening to port: ${port}`));
