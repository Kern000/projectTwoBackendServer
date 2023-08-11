const express = require("express");
const router = express.Router();

const { createProfile, 
        updateProfile, 
        addToNestedArray,
        deleteFromNestedArray,
        retrieveNestedArray,
        findItem,
        // getOne // (only for testing)
      } = require("../controller-layer/entry-controller");

const { 
        login,
        register
      } = require("../controller-layer/user-controller");

const { checkAccessAuthorization } = require("../middleware/uid-authorization")


//tested:

router.use("/:id", checkAccessAuthorization);  //all user related will check AccessAuthorization with token

router.get("/login", login);
router.post("/register", register);
router.post("/", createProfile);      //only for admin purposes, both user creation of account and login is in the login path

router.post("/:id/:keyOfDataArray/add", addToNestedArray);
router.get("/:id/:keyOfDataArray/find-all", retrieveNestedArray);
router.get("/:id/:keyOfDataArray/:nestedDataKey/search",findItem)
router.patch("/:id/:keyOfField", updateProfile);
router.patch("/:id/:keyOfDataArray/:nestedDataKey/:itemMatchCondition/delete", deleteFromNestedArray);


// router.get("/:id", getOne) //for testing only (user no access)

module.exports = {router};

