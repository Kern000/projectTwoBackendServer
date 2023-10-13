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

        try{
            let retrievedData = await retrieveArrayData(userId, fieldWithDataArrayAsValue, parameterToSortBy);
            return res.status(201).send(retrievedData);

        } catch (error) {
            console.log('Fail to retrieve data')
            res.status(500).send("Internal Server Error")
        }

    } catch (error) {
        console.log("Bad Url", error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const findItemInNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        const nestedObjectKey = req.params.nestedObjectKey;
        const searchItem = req.query.search;
        
        try {
            let matchedItem = await retrieveArrayItem(userId, fieldWithDataArrayAsValue, nestedObjectKey, searchItem);
            return res.status(201).send(matchedItem);
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.log("Bad url", error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const addToNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        let data = req.body;
        try{
            await addArrayItem(userId, fieldWithDataArrayAsValue, data);
            return res.sendStatus(httpStatus.OK);

        } catch (error){
            console.log('Fail to add to nested array', error)
            res.status(400).send('Bad request');
        }
    } catch (error) {
        console.log("Bad url", error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const updateSettings = async (req, res) => {
    console.log("updateSettings method called")
    try{
        const userId = req.params.id;
        const field = req.params.field;
        let data = req.body;
        try {
            await updateField(userId, field, data);
            return res.sendStatus(httpStatus.ACCEPTED);
        } catch (error) {
            console.log('Failed to update settings field', error);
            res.status(500).send("Internal Server Error")
        }

    } catch (error) {
        console.log("Bad url", error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const deleteFromNestedArray = async (req, res) => {
    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        const nestedObjectKey = req.params.nestedObjectKey;
        const itemMatchCondition = req.params.itemMatchCondition;

        try {
            await deleteArrayItem(userId, fieldWithDataArrayAsValue, nestedObjectKey, itemMatchCondition);
            return res.sendStatus(httpStatus.ACCEPTED);
        } catch (error) {
            res.status(500).send("Internal Server Error")            
        }
    } catch (error) {

        console.log("Bad url", error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

module.exports= {
                    retrieveNestedArray,
                    findItemInNestedArray,
                    addToNestedArray,
                    updateSettings,
                    deleteFromNestedArray,
                };
