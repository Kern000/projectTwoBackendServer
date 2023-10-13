const express = require("express");
const router = express.Router();

const { updateSettings, 
        addToNestedArray,
        deleteFromNestedArray,
        retrieveNestedArray,
        findItemInNestedArray,
      } = require("../controller-layer/entry-controller");

const { checkAccessAuthorization, controllerValidator } = require("../middleware/uid-authorization")

router.use("/:id", checkAccessAuthorization);

router.post("/:id/:fieldWithDataArrayAsValue", [controllerValidator], addToNestedArray);
router.get("/:id/:fieldWithDataArrayAsValue", [controllerValidator], retrieveNestedArray);
router.get("/:id/:fieldWithDataArrayAsValue/:nestedObjectKey", [controllerValidator], findItemInNestedArray)
router.patch("/:id/:field", [controllerValidator], updateSettings);
router.patch("/:id/:fieldWithDataArrayAsValue/:nestedObjectKey/:itemMatchCondition", [controllerValidator], deleteFromNestedArray);

module.exports = {router};

