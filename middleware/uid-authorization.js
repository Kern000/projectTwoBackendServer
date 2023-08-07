const express = require('express');
const httpStatus = require('http-status');
const { findById:findOne } = require("../service-layer/entry-service")

const checkAccessAuthorization = async (req, res, next) => {

    const userId = req.params.id
    const headerUid = req.headers.uid             //the Firebase uid that needs to be in the request header

    try {
        const matchedUser = await findOne(userId)
        if (!matchedUser) {
            return res.sendStatus(httpStatus.NOT_FOUND);
        }
        if (matchedUser.firebaseUid !== headerUid){
            return res.sendStatus(httpStatus.UNAUTHORIZED);
        }
    } catch (error) {
        console.error('Error checking authorization with firebase');
    }
    next();
}

module.exports = checkAccessAuthorization;