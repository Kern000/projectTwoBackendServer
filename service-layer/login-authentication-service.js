const firebaseAdmin = require("firebase-admin");
const bcrypt = require('bcrypt');
const { EntryModel: User } = require('../model-schema')

const register = async (registerData) => {

    const {emailAddress, password} = registerData;

    const existingUser = await User.findOne(emailAddress);
    
    if (!existingUser) {
        try{
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);
            
                try{
                    firebaseAdmin.auth().createUserWithEmailAndPassword(emailAddress, hashedPassword)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        console.log('New User Authenticated!', user);
                    })
                    
                    try {
                            const newUser = new User({emailAddress, hashedPassword});
                            await newUser.save();
                            console.log("new account created");
                    
                    } catch (error) {
                            console.log("Failed to create new account, ", error);
                    }

                } catch (error) {
                    console.error('Failed to create token: ', error);
                }

        } catch (error) {
            console.log("Failed to hash password, ", error);
        }

    } else {
        console.log("Email Address already in use!");
    }
}

const login = async (loginData) => {
    
    const {emailAddress, password, idToken} = loginData;

    const existingUser = await User.findOne(emailAddress);

    const verifyPassword = async (password, storedHashPassword) => {
        const match = await bcrypt.compare(password, storedHashPassword)
        if (match) {
            return true;
        } else {
            console.log("wrong password");
            return false;
        }
    }

    if (existingUser) {
        const match = verifyPassword(password, existingUser[password])
        if (match){
            try{
                await firebaseAdmin.auth().verifyIdToken(idToken);  //if fail to authenticate, will throw error for catching
                console.log("Authentication Success!");
            } catch (error) {          
                console.log("Authentication Error!", error);
                throw error;
            }
        }
    }
}

// verifyIdToken will lead to decoded token, where said token includes a firebase generated uid which can be used as authorization header
// this authentication will still need authorization on the other functions in the server, we will use a middleware for that

module.exports= {
                    register,
                    login
                };

// In real life, need to send verification email to confirm newUser.;
// would ask user to confirm their password too;

// Front End will handle storing the token generated;