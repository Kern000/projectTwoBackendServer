const express = require("express");
const router = express.Router();

const { updateSettings, 
        addToNestedArray,
        deleteFromNestedArray,
        retrieveNestedArray,
        findItemInNestedArray,
      } = require("../controller-layer/entry-controller");

const { checkAccessAuthorization } = require("../middleware/uid-authorization")

router.use("/:id", checkAccessAuthorization);

router.post("/:id/:fieldWithDataArrayAsValue", addToNestedArray);
router.get("/:id/:fieldWithDataArrayAsValue", retrieveNestedArray);
router.get("/:id/:fieldWithDataArrayAsValue/:nestedObjectKey",findItemInNestedArray)
router.patch("/:id/:field", updateSettings);
router.patch("/:id/:fieldWithDataArrayAsValue/:nestedObjectKey/:itemMatchCondition", deleteFromNestedArray);

module.exports = {router};

