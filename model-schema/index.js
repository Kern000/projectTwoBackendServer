const mongoose= require("mongoose");
const EntryModel = require("./user-schema");

const mongoURI = process.env.MONGO_URL;
const dbConnection = mongoose.connection;

(async() => {await mongoose.connect(mongoURI,
    {useNewUrlParser: true,
    useUnifiedTopology: true});
    }) (). catch(err => console.log(err));

dbConnection.on("error", (err) => console.log(err.message + 'mongo Connection Error'));
dbConnection.on("connected", () => console.log("mongo connected"));
dbConnection.on("disconnected", () => console.log("mongo disconnected"))

module.exports = {EntryModel}


// Best practice: point of consolidation for multiple models to export as an entry point (when called by other layers - namely root dir index.js)
// no need to export the connection out from here, because we will use mongoose inbuilt commands for our Data Access Layer.
