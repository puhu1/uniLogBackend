const constant              = require(__basePath + '/app/config/constant');
const response              = require(constant.path.app + 'util/response');
const utility               = require(constant.path.app + 'util/utility');
const config                = require(constant.path.app + 'core/configuration');
const moment                = require('moment');
const async                 = require('async');
const {logger}              = require(constant.path.app + 'core/logger');
const underscore            = require('underscore');
const fs                    = require('fs');
const request               = require('request');
const winston               = require('winston');
const chatModel             = require(constant.path.app + 'module/model/database/chatModel');

const chatModelObj   = new chatModel();

/*
 * Register Chat
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.create = function (req, res, next) {
    let postMessage = utility.validOrDefault(req.body.postMessage, null);
    let userId = utility.validOrDefault(req.body.userId, null);

    logger.info('[create] add new chat with param %s, %s', userId, postMessage);

    let validateData = function(callback) {
        if (utility.isEmpty(postMessage) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'Comment is required!'));
        } else if (utility.isEmpty(userId) === true) {
            return res.status(500).json(response.build('ERROR_VALIDATION', 'userId is required!'));
        }

        return callback(null);
    }

    let createChat = function (callback) {
        chatModelObj.createChat(userId, postMessage, function (error, result, body) {
            if (error) {
                return callback(error);
            }

            return callback(null, body);
        });
    }

    async.waterfall([
        validateData,
        createChat
    ], function (error, result, body) {
        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }

        
        logger.info('[createChat] Returned with status [%s].', 200);

        return res.status(200).json(response.build('SUCCESS', true));
    });


};

/*
 * Login check
 * @param {object} req
 * @param {object} res
 * @returns {json}
 */
exports.getAll = function (req, res, next) {
    // let userId = utility.validOrDefault(req.param('userId'), null);

    logger.info('[chat] chat with param %s');

    let validateData = function(callback) {
        // if (utility.isEmpty(userId) === true) {
        //     return res.status(500).json(response.build('ERROR_VALIDATION', 'UserId is required!'));
        // }
        chatModelObj.getAllUserChat( function (error, result) {
            if (error) {
                return callback(error);
            }
            
            if (utility.isEmpty(result) === true) {
                return callback(null, false);
            } else {

                return callback(null, true, result);
            }
        });
        
    }

    async.waterfall([
        validateData
    ], function (error, result, body) {
        if (error) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
        }
        
        logger.info('[chat] Returned with status [%s].', 200);

        if (result == false) {
            return res.status(500).json(response.build('USER_NOT_FOUND'));
        }

        return res.status(200).json(response.build('SUCCESS', body));
    });


};


