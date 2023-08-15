const { UserEntryModel: Entry } = require('../model-schema')

const findById = async (id) => {
    try {
      const entry = await Entry.findById(id);
      return entry;
    } catch (error) {
      throw error;
    }
};

const retrieveNestedArrayData = async (userId, keyOfDataArray, parameterToSortBy) => {
    try{
        const foundUser = await Entry.findById(
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

const findItemInNestedArray = async (userId, keyOfDataArray, nestedDataKey, searchItem) => {
    try{
        const foundUser = await Entry.findById(
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

const addItemToNestedArray = async (userId, keyOfDataArray, data) => {
    try{
        const foundUser = await Entry.findById(userId);

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
        let foundUser = await Entry.findById(userId);
            if (foundUser){
                foundUser[keyOfField] = data[keyOfField]
                const savedUser = await foundUser.save();
                return savedUser;
            } else {
                
                throw new Error("User not found");
            }
        } catch (error) {
            throw new error;
        }
}

const deleteMatchingInNestedArray = async (userId, keyOfDataArray, nestedDataKey, itemMatchCondition) => {
    try{
        let foundUser = await Entry.findById(userId);
        
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
                        retrieveNestedArrayData,
                        findItemInNestedArray,
                        addItemToNestedArray,
                        updateFieldData,
                        deleteMatchingInNestedArray,
                        findById,
                    }
