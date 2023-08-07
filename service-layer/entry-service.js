const { EntryModel } = require('../model-schema')
// to use mongoose schema and build on mongoose inbuilt functions for interaction with mongoDB

const findById = async (id) => {
    try {
      const entry = await EntryModel.findById(id);          //finds by the id number only, no need ObjectId format, automatically looks under _id field
      return entry;
    } catch (error) {
      throw error;
    }
};

const create = async (data) => {
    try {
        const createdDocument = await EntryModel.create(data);
        return createdDocument;
    } catch (error) {
        throw error;
    }
}

const retrieveNestedArrayData = async (userId, keyOfDataArray, parameterToSortBy) => {
    try{
        const foundUser = await EntryModel.findById(
            userId,
            {[keyOfDataArray]:1}
        ).sort({[`${keyOfDataArray}.${parameterToSortBy}`]:-1})
        
        if (!foundUser){
            throw new Error("User not found");
        }       
        return foundUser[keyOfDataArray];

    } catch (error){
        throw error;
    }
}
// Based on documentation, 2nd parameter in findById is selection option, we will choose to only project values in selected data array
// based on documentaton, nested item query is 'key.nestedkey'

const findItemInNestedArray = async (userId, keyOfDataArray, nestedDataKey, searchItem) => {
    try{
        const foundUser = await EntryModel.findById(
            userId,
            {[keyOfDataArray]:1}
        )
        
        const nestedArray = foundUser[keyOfDataArray];
        const matchingItems = nestedArray.filter(item => item[nestedDataKey] === searchItem);

        if (!matchingItems){
            throw new Error("Matching item not found")   
        }

        return matchingItems;

    } catch (error){
        throw error;
    }
}

// [keyOfDataArray] is needed to inform mongodb that we are looking specifically within an array. Conventional query simply matches {key: condition}.
// methods in entry-service is very specific and can only edit specific fields, this restricts access to very limited specific fields.

const addItemToNestedArray = async (userId, keyOfDataArray, data) => {
    try{
        const foundUser = await EntryModel.findById(userId);

        if (foundUser){
            foundUser[keyOfDataArray].push(data)
            await foundUser.save();
            return foundUser[keyOfDataArray];
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        throw error;
    }
}

const updateFieldData = async (userId, keyOfField, data) =>{
    try{
        let foundUser = await EntryModel.findById(userId);
            if (foundUser){
                let foundKey = foundUser.hasOwnProperty(keyOfField)
                foundUser[keyOfField] = data[keyOfField]
                const savedUser = await foundUser.save();
                return savedUser;
            } else {
            throw new Error("User not found");
            }
        } catch (error) {
            throw error;
        }
}
// cannot do like normal object to use {...object, data}, because it will not be a Mongo Document, it will just be an object

const deleteMatchingInNestedArray = async (userId, keyOfDataArray, nestedDataKey, itemMatchCondition) => {
    try{
        let foundUser = await EntryModel.findById(userId);
        
              if (foundUser) {
                foundUser[keyOfDataArray] = foundUser[keyOfDataArray].filter(item => item[nestedDataKey] !== itemMatchCondition);
                await foundUser.save();
                return foundUser[keyOfDataArray];
              } else {
                throw new Error("User not found");
              }
    } catch (error) {
        throw error;
    }
};

module.exports =    {
                        create,
                        retrieveNestedArrayData,
                        findItemInNestedArray,
                        addItemToNestedArray,
                        updateFieldData,
                        deleteMatchingInNestedArray,
                        findById
                    }
