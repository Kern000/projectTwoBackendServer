const express = require("express");
const router = express.Router();

const { createProfile, 
        updateProfile, 
        addToNestedArray,
        deleteFromNestedArray,
        retrieveNestedArray,
        findItem,
        getOne
      } = require("../controller-layer/entry-controller");

router.post("/", createProfile);
router.post("/:id/:keyOfDataArray/add", addToNestedArray);

router.put("/:id/:keyOfField", updateProfile);


router.delete("/:id/:keyOfDataArray/:nestedDataKey/:itemMatchCondition/delete", deleteFromNestedArray);

//tested:
router.get("/:id/:keyOfDataArray/find-all", retrieveNestedArray);
router.get("/:id/:keyOfDataArray/:nestedDataKey/search",findItem)
// router.get("/:id", getOne) //for testing only (user no access)

module.exports = {router};

//Example of GET for findItem is
// /user/123/blockedNumbers/search?searchItem=xxx
// xxx will be the search condition


