const { EntryModel } = require('../model-schema')
// to use mongoose schema and build on mongoose inbuilt functions for interaction with mongoDB

const create = async (data) => {
    try {
        const createdDocument = await EntryModel.create(data);
        return createdDocument;
    } catch (error) {
        throw error;
    }
}

const updateFieldData = async (userId, keyOfField, data) =>{
    try{
        const foundUser = await EntryModel.findById(userId);
        if (foundUser){
            foundUser[keyOfField] = data;
            const updatedUser = await foundUser.save();
            return updatedUser;
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        throw error;
    }
}

const addItemToNestedArray = async (userId, keyOfDataArray, data) => {
    try{
        const foundUser = await EntryModel.findById(userId);
        if (foundUser){
            foundUser[keyOfDataArray].push(data);
            const updatedUser = await foundUser.save();
            return updatedUser;
        } else {
            throw new Error("User not found");
        }
    } catch (error) {
        throw error;
    }
}

const deleteMatchingInNestedArray = async (userId, keyOfDataArray, itemMatchCondition) => {
    try{
        const foundUser = await EntryModel.findById(userId);
        if (foundUser) {
            const updatedUser = await EntryModel.findByIdAndUpdate(
                userId,
                {$pull: {[keyOfDataArray]: itemMatchCondition}},
                {new: true}
            );
            return updatedUser;
        } else {
            throw new Error("User not found")
        }
    } catch (error) {
        throw error;
    }
}
// pull will remove all matching items in the array
// {new: true} is specific to findByIdAndUpdate, and is needed to return the updated doc, otherwise it will return the original doc before the update is performed

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
//Based on documentation, 2nd parameter in findById is selection option, we will choose to only project values in selected data array
// based on documentaton, nested item query is 'key.nestedkey'


const findItemInNestedArray = async (userId, keyOfDataArray, searchItem) => {
    try{
        const foundUserItem = await EntryModel.findById(
            userId,
            {[keyOfDataArray]:1}
        ).find({[keyOfDataArray]: {$elemMatch: searchItem}})
        
        if (!foundUserItem){
            throw new Error("Matching item not found")   
        }

        return foundUserItem;

    } catch (error){
        throw error;
    }
}

// [keyOfDataArray] is needed to inform mongodb that we are looking specifically within an array. Conventional query simply matches {key: condition}.
// methods in entry-service is very specific and can only edit specific fields, this restricts access to very limited specific fields.

module.exports =    {
                        create,
                        addItemToNestedArray,
                        updateFieldData,
                        deleteMatchingInNestedArray,
                        retrieveNestedArrayData,
                        findItemInNestedArray
                    }
