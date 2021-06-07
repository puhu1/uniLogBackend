const constant   = require(__basePath + '/app/config/constant');
const database   = require(constant.path.app + 'core/database');
const utility    = require(constant.path.app + 'util/utility');
const underscore = require("underscore");

class ChatModel {

    constructor() {
        this.databaseObj = database.getInstance();
    }

    static get DB() {
        return {
            READSLAVE: 'READSLAVE',
            MASTER   : 'MASTER'
        };
    }

    createChat(userId, postMessage, callback) {
        let userData = {
            chatId   : utility.uuid(),
            userId   : userId,
            postMessage  : postMessage
        };

        let query = `
            INSERT INTO 
                chat (
                    chatId,
                    userId,
                    postMessage                    
                ) 
            VALUES (
                :chatId,
                :userId,
                :postMessage
            ) 
        `;

        this.databaseObj.query(
            ChatModel.DB.MASTER,
            {
                sql   : query,
                values: userData
            },
            callback,
            {queryFormat: 'namedParameters'}
        );
    };

    getAllUserChat(callback) {

        let query = `
            SELECT
                *
            FROM 
                chat
            
            ORDER BY
                createdAt desc
        `;

        this.databaseObj.query(
            ChatModel.DB.READSLAVE,
            {
                sql   : query,
                // values: [userId]
            },
            callback
        );
    };


}

module.exports = ChatModel;
