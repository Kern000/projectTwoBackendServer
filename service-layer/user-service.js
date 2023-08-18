const firebaseAdmin = require("firebase-admin");
const { User } = require('../model-schema');
const { Entry } = require('../model-schema');

const login = async (data) => {

    const {emailAddress, idToken} = data;

    try{
        await firebaseAdmin.auth().verifyIdToken(idToken);
        console.log("Authenticated Valid Token");

        let existingUser = await User.findOne({'emailAddress':emailAddress});
        if (existingUser) {
            console.log("Existing User Verified: ", existingUser);

            const userEntry = await Entry.findOne({'user': existingUser._id})

            const fetchParamsId = userEntry._id.toString();
            return fetchParamsId;
        }
    } catch (error) {
        console.error("Error verifying token, failed login", error);
        throw error;
    }
}

const register = async (data) => {

    const {emailAddress, idToken} = data;

    let existingUser = await User.findOne({'emailAddress':emailAddress});

    try {

        await firebaseAdmin.auth().verifyIdToken(idToken);
        console.log("Authenticated Valid Token");

        if (!existingUser) {
            existingUser = new User({'emailAddress':emailAddress});
            await existingUser.save();

            let newEntry = new Entry({user: existingUser._id});
            await newEntry.save();

            const fetchParamsId = newEntry._id.toString()
            return fetchParamsId
        }
    } catch (error) {
        console.error("Error verifying token, failed registration", error);
        throw error;
    }
}

module.exports= {
                    login,
                    register
                };