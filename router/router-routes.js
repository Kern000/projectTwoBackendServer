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

//tested:
router.post("/", createProfile);
router.post("/:id/:keyOfDataArray/add", addToNestedArray);
router.get("/:id/:keyOfDataArray/find-all", retrieveNestedArray);
router.get("/:id/:keyOfDataArray/:nestedDataKey/search",findItem)
router.patch("/:id/:keyOfField", updateProfile);
router.patch("/:id/:keyOfDataArray/:nestedDataKey/:itemMatchCondition/delete", deleteFromNestedArray);

// router.get("/:id", getOne) //for testing only (user no access)

module.exports = {router};

