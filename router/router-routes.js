const express = require("express");
const router = express.Router();

const { updateSettings, 
        addToNestedArray,
        deleteFromNestedArray,
        retrieveNestedArray,
        findItemInNestedArray,
        searchForMinusNumbers,
        searchForPlusNumbers
      } = require("../controller-layer/entry-controller");

const { checkAccessAuthorization, controllerValidator } = require("../middleware/uid-authorization")

router.use("/:id", checkAccessAuthorization);

router.post("/:id/:fieldWithDataArrayAsValue", [controllerValidator], addToNestedArray);
router.get("/:id/:fieldWithDataArrayAsValue", retrieveNestedArray);
router.get("/:id/:fieldWithDataArrayAsValue/:nestedObjectKey", findItemInNestedArray)
router.patch("/:id/:field", [controllerValidator], updateSettings);
router.patch("/:id/:fieldWithDataArrayAsValue/:nestedObjectKey/:itemMatchCondition", deleteFromNestedArray);

router.get("/:id/:fieldWithDataArrayAsValue/:nestedObjectKey/searchPlus", searchForPlusNumbers);
router.get("/:id/:fieldWithDataArrayAsValue/:nestedObjectKey/searchMinus", searchForMinusNumbers);

module.exports = {router};

