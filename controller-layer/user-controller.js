const httpStatus = require('http-status');
const {register: registerUser, login: loginUser} = require('../service-layer/login-authentication-service');

const register = async (req, res) => {
    const {emailAddress, password} = req.body;
    
    try{
        await registerUser(emailAddress, password)
        return res.sendStatus(httpStatus.CREATED);
    } catch (error) {
        console.error("Controller failed to register user", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

const login = async (req, res) => {
    const {emailAddress, password} = req.body;
    const idToken = req.headers.authorization? req.headers.authorization.split(" ")[1]: '';
    //splits the header value by a space. The header usually has a format like "Bearer <ID_TOKEN>", so splitting by space separates the word "Bearer" from the actual ID token. The [1] index retrieves the second part of the split array, which is the ID token itself
    
    try{
        await loginUser(emailAddress ,password, idToken)
        return res.sendStatus(httpStatus.OK);
    } catch (error) {
        console.error("Controller failed to login user", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
    }
}

module.exports =    {
                        register,
                        login
                    };


