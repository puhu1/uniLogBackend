const constant  = require(__basePath + 'app/config/constant');
const router    = require('express').Router({
    caseSensitive   : true,
    strict          : true
});

const chatAssembly   = require(constant.path.module + 'assembly/chat/chatAssembly');
const validation    = require(constant.path.module + 'assembly/chat/chatValidation');


/*
 * Router list
 */
 /* Register chats */
router.post(
    '/create',
    validation.create,
    chatAssembly.create
);

/* reset chat password */
router.get(
    '/getAll',
    validation.getAll,
    chatAssembly.getAll
);

module.exports = {
    router: router
};
