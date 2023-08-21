const firebaseAdmin = require("firebase-admin")
const httpStatus = require('http-status');

const checkAccessAuthorization = async (req, res, next) => {

    const idToken = req.headers.authorization? req.headers.authorization.split(" ")[1] : "";

    try {
        await firebaseAdmin.auth().verifyIdToken(idToken);
        console.log("middleware verified Id Token, authorized access");
        next();
    } catch (error) {
        console.log("Id token verification by middleware failed. Access Rejected", error)
        return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
}

module.exports = {checkAccessAuthorization};