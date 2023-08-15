const express = require("express");
const router = express.Router();

const { 
        updateProfile, 
        addToNestedArray,
        deleteFromNestedArray,
        retrieveNestedArray,
        findItem,
      } = require("../controller-layer/entry-controller");

const { 
        login,
        register
      } = require("../controller-layer/user-controller");

const { checkAccessAuthorization } = require("../middleware/uid-authorization")

// Routes

router.use("/:id", checkAccessAuthorization);  //all user related will check AccessAuthorization with token

router.get("/login", login);
router.post("/register", register);

router.post("/:id/:keyOfDataArray", addToNestedArray);
router.get("/:id/:keyOfDataArray", retrieveNestedArray);
router.get("/:id/:keyOfDataArray/:nestedDataKey",findItem)
router.patch("/:id/:keyOfField", updateProfile);
router.patch("/:id/:keyOfDataArray/:nestedDataKey/:itemMatchCondition", deleteFromNestedArray);

module.exports = {router};

