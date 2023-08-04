const firebaseAdmin = require("firebase-admin");
const firebaseServiceAccount = require("./firebase-account-key.json");

firebaseAdmin.initializeApp(
    {credential: firebaseAdmin.credential.cert(firebaseServiceAccount)}
);
console.log("Firebase Admin Initialized")

// This is the private key generated from firebase website
