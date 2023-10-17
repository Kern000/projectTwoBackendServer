const httpStatus = require("http-status");

const   {   
            updateFieldData: updateField,
            addItemToNestedArray: addArrayItem,
            deleteMatchingInNestedArray: deleteArrayItem,
            retrieveNestedArrayData: retrieveArrayData,
            findItemInNestedArray: retrieveArrayItem,
            searchForPlusNumbers: serviceSearchForPlusNumbers,
            searchForMinusNumbers: serviceSearchForMinusNumbers
        } = require("../service-layer/entry-service");

const retrieveNestedArray = async (req, res) => {

    console.log("retrieveNestedArray route called")

    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        const parameterToSortBy = 'timeStamp';

        try{
            let retrievedData = await retrieveArrayData(userId, fieldWithDataArrayAsValue, parameterToSortBy);
            console.log("Retrieved data here", retrievedData);
            return res.status(201).send(retrievedData);

        } catch (error) {
            console.log('Fail to retrieve data', error);
            res.status(500).send("Internal Server Error");
        }

    } catch (error) {
        console.log("Bad Url", error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const findItemInNestedArray = async (req, res) => {

    console.log("Find Item in nested array route hit");

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

const searchForPlusNumbers = async (req, res) => {

    console.log("search for plus numbers controller hit");

    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        const nestedObjectKey = req.params.nestedObjectKey;
        
        try {
            let matchedItem = await serviceSearchForPlusNumbers(userId, fieldWithDataArrayAsValue, nestedObjectKey);
            console.log('matched item here', matchedItem);
            return res.status(201).send(matchedItem);

        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    } catch (error) {
        console.log("Bad url", error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const searchForMinusNumbers = async (req, res) => {

    console.log("Search for minus number controller hit");

    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        const nestedObjectKey = req.params.nestedObjectKey;
        
        try {
            let matchedItem = await serviceSearchForMinusNumbers(userId, fieldWithDataArrayAsValue, nestedObjectKey);
            console.log('matched Item here=>', matchedItem)
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

    console.log("add to nested array");

    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        let data = req.body;

        try{
            await addArrayItem(userId, fieldWithDataArrayAsValue, data);
            return res.sendStatus(httpStatus.OK);

        } catch (error){
            console.log('Fail to add to nested array', error);
            res.status(500).send('Internal Server Error');
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
            res.status(500).send("Internal Server Error");
        }

    } catch (error) {
        console.log("Bad url", error);
        return res.sendStatus(httpStatus.BAD_REQUEST);
    }
}

const deleteFromNestedArray = async (req, res) => {

    console.log("detele from nested array method hit");

    try{
        const userId = req.params.id;
        const fieldWithDataArrayAsValue = req.params.fieldWithDataArrayAsValue;
        const nestedObjectKey = req.params.nestedObjectKey;
        const itemMatchCondition = req.params.itemMatchCondition;

        try {
            await deleteArrayItem(userId, fieldWithDataArrayAsValue, nestedObjectKey, itemMatchCondition);
            return res.sendStatus(httpStatus.ACCEPTED);

        } catch (error) {
            res.status(500).send("Internal Server Error");
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
                    searchForMinusNumbers,
                    searchForPlusNumbers
                };
