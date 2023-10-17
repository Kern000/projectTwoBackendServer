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

        console.log(userId)
        const foundUser = await Entry.findById(
            userId,
            {[fieldWithDataArrayAsValue]:1}
        )
        console.log(foundUser)

        const nestedArray = foundUser[fieldWithDataArrayAsValue];
        const matchingItems = nestedArray.filter(item => item[nestedObjectKey] === searchItem);

        if (!matchingItems){
            throw new Error("Matching item not found");
        }
        return matchingItems;
}

const addItemToNestedArray = async (userId, fieldWithDataArrayAsValue, data) => {

        console.log(userId)
        const foundUser = await Entry.findById(userId);
        console.log(foundUser)

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

const searchForPlusNumbers = async (userId, fieldWithDataArrayAsValue, nestedObjectKey) => {

    console.log('search for plus number service, userId here=>', userId);

    try{
        const matchingItems = await Entry.aggregate([
            {
                $match:{
                    'user': userId
                }
            },
            {
                $project:{
                    [fieldWithDataArrayAsValue]:1
                }
            },
            {
                $unwind: `$${fieldWithDataArrayAsValue}`
            }
            // ,
            // {
            //     $match:{
            //         [`${fieldWithDataArrayAsValue}.${nestedObjectKey}`]: {$regex: `^[+]`}
            //     }
            // }
        ])
        console.log('matching items here in service', matchingItems);

        if (matchingItems.length === 0){
            console.log('matching items length is array w no items')
            throw new Error("Matching item not found");
        } else {
        return matchingItems;
        }
    } catch (error) {
        console.log('error in aggregation pipeline in service', error);
    }
}

const searchForMinusNumbers = async (userId, fieldWithDataArrayAsValue, nestedObjectKey) => {

    console.log('search for minus number service, userId here=>', userId)

    try {
        const matchingItems = await Entry.aggregate([
            {
                $match:{
                    'user': userId
                }
            },
            {
                $project:{
                    [fieldWithDataArrayAsValue]:1
                }
            },
            {
                $unwind: `$${fieldWithDataArrayAsValue}`
            }
            // ,
            // {
            //     $match:{
            //         [`${fieldWithDataArrayAsValue}.${nestedObjectKey}`]: {$regex: `^[-]`}
            //     }
            // }
        ])

        console.log('matching items here in service', matchingItems);
        if (matchingItems.length === 0){
            console.log('matching items length is array w no items')
            throw new Error("Matching item not found");
        } else {
        return matchingItems;
        }
    } catch (error){
        console.log('error in service aggregate pipeline=>', error)
    }

}


module.exports =    {
                        retrieveNestedArrayData,
                        findItemInNestedArray,
                        addItemToNestedArray,
                        updateFieldData,
                        deleteMatchingInNestedArray,
                        searchForMinusNumbers,
                        searchForPlusNumbers
                    };
