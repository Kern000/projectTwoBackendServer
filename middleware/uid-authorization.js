const firebaseAdmin = require("firebase-admin")
const httpStatus = require('http-status');
const Joi = require('joi').extend(require('@joi/date'));

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

const countryCodeSchema = Joi.object({
    code: Joi.string().pattern(new RegExp('^[0-9+ -]{0,8}$')),
    timeStamp: Joi.date()
})

const hpNumberSchema = Joi.object({
    hpNumber: Joi.string().pattern(new RegExp('^[0-9+ -]{0,15}$')),
})

const officeNumberSchema = Joi.object({
    officeNumber: Joi.string().pattern(new RegExp('^[0-9+ -]{0,15}$')),
})

const homeNumberSchema = Joi.object({
    homeNumber: Joi.string().pattern(new RegExp('^[0-9+ -]{0,15}$')),
})

const blockedNumberSchema = Joi.object({
    blockedNumber: Joi.string().pattern(new RegExp('^[0-9+ -]{0,15}$')),
    timeStamp: Joi.date()
})

const whiteListNumberSchema = Joi.object({
    whiteListedNumber: Joi.string().pattern(new RegExp('^[0-9+ -]{0,15}$')),
    timeStamp: Joi.date()
})

const controllerValidator = async (req, res, next) => {

    console.log('middleware joi validation hit')

    if (req.body.code){
        try {
            countryCodeSchema.validate(req.body);
            console.log('validation for country code success');
            next();

        } catch (error) {
            console.log("country validation failed", error);
            res.status(400).send("Failed validation, Bad request");
        }
    }
    else if (req.body.hpNumber){
        try {
            hpNumberSchema.validate(req.body);
            console.log('validation for hp number success');
            next();

        } catch (error) {
            console.log("hp number validation", error);
            res.status(400).send("Failed validation, Bad request");
        }
    }
    else if (req.body.officeNumber){
        try {
            officeNumberSchema.validate(req.body);
            console.log('validation for office number success');
            next();

        } catch (error) {
            console.log("office number validation", error);
            res.status(400).send("Failed validation, Bad request");
        }
    }
    else if (req.body.homeNumber){
        try {
            homeNumberSchema.validate(req.body);
            console.log('validation for home number success');
            next();

        } catch (error) {
            console.log("home number validation", error);
            res.status(400).send("Failed validation, Bad request");
        }
    }
    else if (req.body.blockedNumber){
        try {
            blockedNumberSchema.validate(req.body);
            console.log('validation for blocked number success');
            next();

        } catch (error) {
            console.log("blocked number validation", error);
            res.status(400).send("Failed validation, Bad request");
        }
    }
    else if (req.body.whiteListedNumber){
        try {
            whiteListNumberSchema.validate(req.body);
            console.log('validation for whitelist number success');
            next();
        } catch (error) {
            console.log("white listed number validation", error);
            res.status(400).send("Failed validation, Bad request");            
        }
    }
    else {
        res.status(400).send("Request fail to pass validation, Bad request");
    }
}



module.exports = {checkAccessAuthorization, controllerValidator};