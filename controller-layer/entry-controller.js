const httpStatus = require("http-status");

const   {   
            updateFieldData: updateField,
            addItemToNestedArray: addArrayItem,
            deleteMatchingInNestedArray: deleteArrayItem,
            retrieveNestedArrayData: retrieveArrayData,
            findItemInNestedArray: retrieveArrayItem,
        } = require("../service-layer/entry-service");

const retrieveNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const keyOfObjectNestedInDataArray = req.params.keyOfDataArray;
        const parameterToSortBy = 'timeStamp';

        await retrieveArrayData(userId, keyOfObjectNestedInDataArray, parameterToSortBy);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.log("Fail to retrieve data", error);
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

const findItem = async (req, res) => {
    try{
        const userId = req.params.id;
        const keyOfDataArray = req.params.keyOfDataArray;
        const nestedDataKey = req.params.nestedDataKey;
        console.log(userId, keyOfDataArray, nestedDataKey);
        const searchItem = req.query.search;
        console.log(searchItem);
        
        const foundItems = await retrieveArrayItem(userId, keyOfDataArray, nestedDataKey, searchItem);
        return res.sendStatus(httpStatus.FOUND);
    } catch (error) {
        console.log("Failed to find item", error);
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

const addToNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const keyOfDataArray = req.params.keyOfDataArray;
        let data = req.body;

        let itemAdded = await addArrayItem(userId, keyOfDataArray, data);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.log("Failed to add data", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const updateProfile = async (req, res) => {
    try{
        const userId = req.params.id;
        const keyOfField = req.params.keyOfField;
        let data = req.body;
        await updateField(userId, keyOfField, data);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.log("Settings update failed", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const deleteFromNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const keyOfDataArray = req.params.keyOfDataArray;
        const nestedDataKey = req.params.nestedDataKey;
        const itemMatchCondition = req.params.itemMatchCondition;

        const updatedItems = await deleteArrayItem(userId, keyOfDataArray, nestedDataKey, itemMatchCondition);
        return res.sendStatus(httpStatus.ACCEPTED);
    } catch (error) {
        console.log("Failed to delete item", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports= {
                    retrieveNestedArray,
                    findItem,
                    addToNestedArray,
                    updateProfile,
                    deleteFromNestedArray,
                };
