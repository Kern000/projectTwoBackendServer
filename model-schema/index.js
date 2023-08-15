const mongoose= require("mongoose");
const UserEntryModel = require("./user-schema");

const mongoURI = process.env.MONGO_URL;
const dbConnection = mongoose.connection;

(async() => {await mongoose.connect(mongoURI,
    {useNewUrlParser: true,
    useUnifiedTopology: true});
    }) (). catch(err => console.log(err));

dbConnection.on("error", (err) => console.log(err.message + 'mongo Connection Error'));
dbConnection.on("connected", () => console.log("mongo connected"));
dbConnection.on("disconnected", () => console.log("mongo disconnected"))

module.exports = {UserEntryModel}