const httpStatus = require("http-status");

const   {   create: createEntry,                                // 1 argument: data
            updateFieldData: updateField,                       // 3 arguments: userId, keyOfField, data
            addItemToNestedArray: addArrayItem,                 // 3 arguments: userId, keyOfDataArray, data
            deleteMatchingInNestedArray: deleteArrayItem,       // 3 arguments: userId, keyOfDataArray, itemMatchCondition
            retrieveNestedArrayData: retrieveArrayData,         // *Tested, works: 3 arguments: userId, keyOfDataArray, parameterToSortBy
            findItemInNestedArray: retrieveArrayItem,            // *Tested, works: 4 arguments: userId, keyOfDataArray, nestedDataArray, searchItem 
            // findById: findOne,
        } = require("../service-layer/entry-service")

        // getOne is only for testing (user no access)
        // const getOne = async (req, res) => {
        //     try{
        //         const entry = await findOne(req.params.id);
        //         if(entry){
        //             return res.json(entry);
        //         }
        //         return res.sendStatus(httpStatus.NOT_FOUND);
        //     }catch(e){
        //         console.log(`Failed to find entry by id ${req.params.id}`, e);
        //         return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
        //     }
        // }



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
        let data = req.body;

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
        let data = req.body;

        let itemAdded = await addArrayItem(userId, keyOfDataArray, data);
        return res.json(itemAdded);
        // return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.log("Failed to add data", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const deleteFromNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const keyOfDataArray = req.params.keyOfDataArray;
        const nestedDataKey = req.params.nestedDataKey;
        let itemMatchCondition = req.params.itemMatchCondition;
        console.log('this is from controller =>', itemMatchCondition)

        await deleteArrayItem(userId, keyOfDataArray, nestedDataKey, itemMatchCondition);
        // return res.sendStatus(httpStatus.ACCEPTED);
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

        const foundItems= await retrieveArrayData(userId, keyOfDataArray, parameterToSortBy);
        return res.json(foundItems) //for testing (works)
        // return res.sendStatus(httpStatus.OK);
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
        const searchItem = req.query.search;
        console.log(searchItem)
        
        const foundItems = await retrieveArrayItem(userId, keyOfDataArray, nestedDataKey, searchItem);
        return res.json(foundItems) //for testing (works)
        // return res.sendStatus(httpStatus.FOUND);
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
                    findItem,
                    // getOne
                }
