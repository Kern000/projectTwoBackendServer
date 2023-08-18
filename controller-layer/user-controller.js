const httpStatus = require('http-status');
const {login:loginUser, register:registerUser} = require('../service-layer/user-service');

const login = async (req, res) => {
    const {emailAddress} = req.body;
    const uid = req.headers.uid;
    const idToken = req.headers.authorization? req.headers.authorization.split(" ")[1] : "";
    
    try{
        const paramsId = await loginUser({uid, emailAddress, idToken})
        return res.sendStatus(httpStatus.ACCEPTED).send(paramsId);
    } catch (error) {
        console.error("Controller failed to login user", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const register = async (req, res) => {
    const {emailAddress} = req.body;
    const uid = req.headers.uid;
    const idToken = req.headers.authorization? req.headers.authorization.split(" ")[1] : "";

    try{
        const paramsId = await registerUser({'uid':uid, 'emailAddress': emailAddress, 'idToken': idToken})
        return res.status(400).send(paramsId);
    } catch (error) {
        console.error("Controller failed to register user", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports =    {
                        login,
                        register,
                    };

