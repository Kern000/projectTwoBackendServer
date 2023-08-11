const firebaseAdmin = require("firebase-admin");
const { EntryModel: User } = require('../model-schema');

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

// VerifyIdToken will lead to decoded token, where said token includes a firebase generated uid which can be used as authorization header
// This authentication will still need authorization on the other functions in the server, we will use a middleware for that
// Previous version, I used Bcrypt to hash password to store inside MongoDb, but decided that it was less secure as I open up another data front for sensitive information. So I decided that userCreation and login will all be handled purely by firebase.

