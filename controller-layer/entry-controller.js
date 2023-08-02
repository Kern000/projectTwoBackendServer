const httpStatus = require("http-status");

const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types;
const objectId = new ObjectId();            //ObjectId("stringid")

const   {   create: createEntry,                                // 1 argument: data
            updateFieldData: updateField,                       // 3 arguments: userId, keyOfField, data
            addItemToNestedArray: addArrayItem,                 // 3 arguments: userId, keyOfDataArray, data
            deleteMatchingInNestedArray: deleteArrayItem,       // 3 arguments: userId, keyOfDataArray, itemMatchCondition
            retrieveNestedArrayData: retrieveArrayData,         // 3 arguments: userId, keyOfDataArray, parameterToSortBy
            findItemInNestedArray: retrieveArrayItem            // 3 arguments: userId, keyOfDataArray, searchItem 
        } = require("../service-layer/entry-service")

const createProfile = async (req, res) => {
    try{
        await createEntry(req.body);
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.log("Profile creation failed", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const updateProfile = async (req, res) => {
    try{
        const userId = req.params.id;
        const keyOfField = req.params.keyOfField;
        const data = req.body;

        await updateField(userId, keyOfField, data);    
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.log("Settings update failed", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const addToNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const keyOfDataArray = req.params.keyOfDataArray;
        const data = req.body;

        await addArrayItem(userId, keyOfDataArray, data);
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.log("Failed to add data", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const deleteFromNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const keyOfDataArray = req.params.keyOfDataArray;
        const itemMatchCondition = req.body;

        await deleteArrayItem(userId, keyOfDataArray, itemMatchCondition);
        return res.sendStatus(httpStatus.ACCEPTED);
    } catch (error) {
        console.log("Failed to delete item", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const retrieveNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const keyOfDataArray = req.params.keyOfDataArray;
        const parameterToSortBy = 'timeStamp';

        await retrieveArrayData(userId, keyOfDataArray, parameterToSortBy);
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
        const searchItem = req.query.searchItem;
        
        await retrieveArrayItem(userId, keyOfDataArray, searchItem);
        return res.sendStatus(httpStatus.FOUND);
    } catch (error) {
        console.log("Failed to find item", error);
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

// for deleted, will use HTTPSTATUS.ACCEPTED rather than OK to prevent server from sending 200 to everything.
// to search use GET /specificId/specifieddataarray/search?searchItem=something

module.exports= {
                    createProfile,
                    updateProfile,
                    addToNestedArray,
                    deleteFromNestedArray,
                    retrieveNestedArray,
                    findItem
                }
