const { Entry } = require('../model-schema');

const retrieveNestedArrayData = async (userId, fieldWithDataArrayAsValue, parameterToSortBy) => {
    
        const foundUser = await Entry.findById(
            userId,
            {[fieldWithDataArrayAsValue]:1}
        ).sort({[`${fieldWithDataArrayAsValue}.${parameterToSortBy}`]:-1})
        
        if (!foundUser){
            throw new Error("User not found");
        }
        return foundUser[fieldWithDataArrayAsValue];
};

const findItemInNestedArray = async (userId, fieldWithDataArrayAsValue, nestedObjectKey, searchItem) => {

        const foundUser = await Entry.findById(
            userId,
            {[fieldWithDataArrayAsValue]:1}
        )
        
        const nestedArray = foundUser[fieldWithDataArrayAsValue];
        const matchingItems = nestedArray.filter(item => item[nestedObjectKey] === searchItem);

        if (!matchingItems){
            throw new Error("Matching item not found");
        }
        return matchingItems;
}

const addItemToNestedArray = async (userId, fieldWithDataArrayAsValue, data) => {

        const foundUser = await Entry.findById(userId);

        if (foundUser){
            foundUser[fieldWithDataArrayAsValue].push(data)
            await foundUser.save();
            return foundUser[fieldWithDataArrayAsValue];
        } else {
            throw new Error("User not found");
        }
}

const updateFieldData = async (userId, field, data) =>{
    let foundUser = await Entry.findById(userId);
        if (foundUser){
            foundUser[field] = data[field]
            const savedUser = await foundUser.save();
            return savedUser;
        } else {
            throw new Error("User not found");
        }
}

const deleteMatchingInNestedArray = async (userId, fieldWithDataArrayAsValue, nestedObjectKey, itemMatchCondition) => {
    
    let foundUser = await Entry.findById(userId);
    
        if (foundUser) {
            foundUser[fieldWithDataArrayAsValue] = foundUser[fieldWithDataArrayAsValue].filter(item => item[nestedObjectKey] !== itemMatchCondition);
            await foundUser.save();
            return foundUser[fieldWithDataArrayAsValue];
        } else {
            throw new Error("User not found");
        }
};

module.exports =    {
                        retrieveNestedArrayData,
                        findItemInNestedArray,
                        addItemToNestedArray,
                        updateFieldData,
                        deleteMatchingInNestedArray
                    };
