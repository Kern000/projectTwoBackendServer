const express = require("express");
const router = express.Router();

const { createProfile, 
        updateProfile, 
        addToNestedArray,
        deleteFromNestedArray,
        retrieveNestedArray,
        findItem
      } = require("../controller-layer/entry-controller");

router.post("/", createProfile);
router.put("/:id/:keyOfField", updateProfile);
router.patch("/:id/:keyOfDataArray/add", addToNestedArray);
router.patch("/:id/:keyOfDataArray/delete", deleteFromNestedArray);
router.get("/:id/:keyOfDataArray/find-all", retrieveNestedArray);
router.get("/:id/:keyOfDataArray/search",findItem)

module.exports = {router};

//Example of GET for findItem is
// /user/123/blockedNumbers/search?searchItem=xxx
// xxx will be the search condition


