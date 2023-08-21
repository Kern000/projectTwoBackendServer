const httpStatus = require('http-status');
const {login:loginUser, register:registerUser} = require('../service-layer/user-service');

const login = async (req, res) => {

    const {emailAddress} = req.body;
    const idToken = req.headers.authorization? req.headers.authorization.split(" ")[1] : "";
    
    try{
        const paramsId = await loginUser({'emailAddress': emailAddress, 'idToken': idToken})
        console.log(paramsId)
        console.log('user controller success')
        return res.status(200).send(paramsId);
    } catch (error) {
        console.error("Controller failed to login user", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

const register = async (req, res) => {
    const {emailAddress} = req.body;
    const idToken = req.headers.authorization? req.headers.authorization.split(" ")[1] : "";

    console.log(idToken)
    try{
        const paramsId = await registerUser({'emailAddress': emailAddress, 'idToken': idToken})
        return res.status(200).send(paramsId);
    } catch (error) {
        console.error("Controller failed to register user", error);
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
}

module.exports =    {
                        login,
                        register,
                    };
