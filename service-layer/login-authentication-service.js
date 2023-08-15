const firebaseAdmin = require("firebase-admin");
const { UserEntryModel: User } = require('../model-schema');

const login = async (data) => {

    const {uid, emailAddress, idToken} = data;

    try{
        await firebaseAdmin.auth().verifyIdToken(idToken);
        console.log("Authenticated Valid Token");

        let existingUser = await User.findOne({uid, emailAddress});
        if (existingUser) {
            console.log("Existing User Verified: ", existingUser);

            const fetchParamsId = existingUser._id.toString();
            return fetchParamsId;
        }
    } catch (error) {
        console.error("Error verifying token", error);
        throw error;
    }
}

const register = async (data) => {

    const {uid, emailAddress, idToken} = data;

    let existingUser = await User.findOne({uid, emailAddress});

    try {

        await firebaseAdmin.auth().verifyIdToken(idToken);
        console.log("Authenticated Valid Token");

        if (!existingUser) {
            existingUser = new User({uid, emailAddress});
            await existingUser.save();
            const fetchParamsId = existingUser._id.toString()
            return fetchParamsId
        }
    } catch (error) {
        console.error("Error verifying token", error);
        throw error;
    }
}

module.exports= {
                    login,
                    register
                };