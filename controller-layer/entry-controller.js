const httpStatus = require("http-status");

const   {   
            updateFieldData: updateField,
            addItemToNestedArray: addArrayItem,
            deleteMatchingInNestedArray: deleteArrayItem,
            retrieveNestedArrayData: retrieveArrayData,
            findItemInNestedArray: retrieveArrayItem,
        } = require("../service-layer/entry-service");

const retrieveNestedArray = async (req, res) => {
    console.log("retrieveNestedArray route called")
    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        const parameterToSortBy = 'timeStamp';

        await retrieveArrayData(userId, fieldWithDataArrayAsValue, parameterToSortBy);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.log("Fail to retrieve data", error);
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

const findItemInNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        const nestedObjectKey = req.params.nestedObjectKey;
        const searchItem = req.query.search;
        
        await retrieveArrayItem(userId, fieldWithDataArrayAsValue, nestedObjectKey, searchItem);
        return res.sendStatus(httpStatus.FOUND);
 
    } catch (error) {
        console.log("Failed to find item", error);
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

const addToNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        let data = req.body;

        await addArrayItem(userId, fieldWithDataArrayAsValue, data);
        return res.sendStatus(httpStatus.OK);

    } catch (error) {
        console.log("Failed to add data", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const updateSettings = async (req, res) => {
    console.log("updateSettings method called")
    try{
        const userId = req.params.id;
        const field = req.params.field;
        let data = req.body;
        await updateField(userId, field, data);
        return res.sendStatus(httpStatus.OK);

    } catch (error) {

        console.log("Settings update failed", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const deleteFromNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        const nestedObjectKey = req.params.nestedObjectKey;
        const itemMatchCondition = req.params.itemMatchCondition;

        await deleteArrayItem(userId, fieldWithDataArrayAsValue, nestedObjectKey, itemMatchCondition);
        return res.sendStatus(httpStatus.ACCEPTED);

    } catch (error) {

        console.log("Failed to delete item", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports= {
                    retrieveNestedArray,
                    findItemInNestedArray,
                    addToNestedArray,
                    updateSettings,
                    deleteFromNestedArray,
                };
